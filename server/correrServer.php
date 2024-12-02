<?php
// server/runServer.php
use Ratchet\App;
use Ratchet\WebSocket\WsServer;

require dirname(__DIR__) . '/vendor/autoload.php';

$app = new App('localhost', 8080); // Configurar servidor en localhost y puerto 8080
$app->route('/chat', new WsServer(new ChatServer), array('*'));
$app->run();
?>