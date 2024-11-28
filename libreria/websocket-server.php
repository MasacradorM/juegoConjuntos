<?php
set_time_limit(0);

class WebSocketServer {
    private $host;
    private $port;
    private $socket;
    private $clients = [];
    private $usuariosEnLinea = [];

    public function __construct($host = '0.0.0.0', $port = 8080) {
        $this->host = $host;
        $this->port = $port;
        $this->createSocket();
    }

    private function createSocket() {
        $this->socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        if (!$this->socket) {
            die("Error al crear el socket: " . socket_strerror(socket_last_error()));
        }

        socket_set_option($this->socket, SOL_SOCKET, SO_REUSEADDR, 1);

        if (!socket_bind($this->socket, $this->host, $this->port)) {
            die("Error al vincular el socket: " . socket_strerror(socket_last_error($this->socket)));
        }

        if (!socket_listen($this->socket)) {
            die("Error al escuchar en el socket: " . socket_strerror(socket_last_error($this->socket)));
        }

        echo "Servidor WebSocket iniciado en {$this->host}:{$this->port}\n";
    }

    public function run() {
        while (true) {
            $readSockets = array_merge([$this->socket], $this->clients);
            if (socket_select($readSockets, $writeSockets, $exceptSockets, 0, 10) < 1) {
                continue;
            }

            if (in_array($this->socket, $readSockets)) {
                $newClient = socket_accept($this->socket);
                $this->clients[] = $newClient;
                $this->handshake($newClient);
                echo "Cliente conectado\n";
            }

            foreach ($this->clients as $client) {
                $data = @socket_read($client, 1024);
                if ($data === false) {
                    $this->removeClient($client);
                    continue;
                }

                $decoded = $this->unmask($data);
                $mensaje = json_decode($decoded, true);
                $this->procesarMensaje($client, $mensaje);
            }
        }
    }

    private function handshake($client) {
        $headers = socket_read($client, 1024);
        if (preg_match("/Sec-WebSocket-Key: (.*)\r\n/", $headers, $matches)) {
            $key = base64_encode(pack('H*', sha1($matches[1] . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
            $response = "HTTP/1.1 101 Switching Protocols\r\n" .
                        "Upgrade: websocket\r\n" .
                        "Connection: Upgrade\r\n" .
                        "Sec-WebSocket-Accept: $key\r\n\r\n";
            socket_write($client, $response, strlen($response));
        }
    }

    private function procesarMensaje($client, $mensaje) {
        if (isset($mensaje['tipo'])) {
            switch ($mensaje['tipo']) {
                case 'login':
                    $this->usuariosEnLinea[$client] = $mensaje['usuarioId'];
                    break;
                case 'logout':
                    unset($this->usuariosEnLinea[$client]);
                    break;
            }

            $this->broadcastUsuariosEnLinea();
        }
    }

    private function broadcastUsuariosEnLinea() {
        $usuarios = array_values($this->usuariosEnLinea);
        $mensaje = json_encode(['tipo' => 'usuarios_en_linea', 'usuarios' => $usuarios]);

        foreach ($this->clients as $client) {
            $this->enviarMensaje($client, $mensaje);
        }
    }

    private function enviarMensaje($client, $mensaje) {
        $mensaje = $this->mask($mensaje);
        socket_write($client, $mensaje, strlen($mensaje));
    }

    private function mask($text) {
        $b1 = 0x81;
        $length = strlen($text);
        if ($length <= 125) {
            return pack('CC', $b1, $length) . $text;
        } elseif ($length < 65536) {
            return pack('CCn', $b1, 126, $length) . $text;
        } else {
            return pack('CCNN', $b1, 127, 0, $length) . $text;
        }
    }

    private function unmask($payload) {
        $length = ord($payload[1]) & 127;
        if ($length === 126) {
            $masks = substr($payload, 4, 4);
            $data = substr($payload, 8);
        } elseif ($length === 127) {
            $masks = substr($payload, 10, 4);
            $data = substr($payload, 14);
        } else {
            $masks = substr($payload, 2, 4);
            $data = substr($payload, 6);
        }

        $decoded = '';
        for ($i = 0; $i < strlen($data); ++$i) {
            $decoded .= $data[$i] ^ $masks[$i % 4];
        }
        return $decoded;
    }

    private function removeClient($client) {
        unset($this->clients[array_search($client, $this->clients)]);
        unset($this->usuariosEnLinea[$client]);
        socket_close($client);
    }
}

$server = new WebSocketServer();
$server->run();
