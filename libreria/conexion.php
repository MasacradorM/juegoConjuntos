<?php

class Database {
    private static $instance = null;
    private $dsn;
    private $server;
    private $usuario;
    private $baseDatos;
    private $password;
    private $conexion;

    private function __construct()
    {
        $this->server = getenv('DB_SERVER') ?: "localhost";
        $this->usuario = getenv('DB_USER') ?: "postgres";
        $this->baseDatos = getenv('DB_NAME') ?: "juegoConjuntos";
        $this->password = getenv('DB_PASS') ?: "123456"; // Considera cambiar a una variable de entorno
        $this->conexion = $this->conectar(); // Establecer la conexión al crear el objeto
    }

    // Método para obtener la instancia de la clase (Singleton)
    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function conectar()
    {
        $this->dsn = 'pgsql:host=' . $this->server . ';port=5432;dbname=' . $this->baseDatos;
        try {
            $conecto = new PDO($this->dsn, $this->usuario, $this->password);
            $conecto->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conecto; // Retorna la conexión
        } catch (PDOException $e) {
            error_log("Error de conexión: " . $e->getMessage()); // Registrar el error
            return null; // Retorna null si no se conectó
        }
    }

    // Método para ejecutar consultas sin retorno de valores
    public function ejecutar($sqlQuery, $values = [])
    {
        if ($this->conexion) {
            try {
                $consulta = $this->conexion->prepare($sqlQuery);
                $consulta->execute($values);
                return $consulta->rowCount(); // Devuelve el número de filas afectadas
            } catch (PDOException $e) {
                error_log("Error en la consulta: " . $e->getMessage());
                return false;
            }
        }
        return false; // Retorna false si no hay conexión
    }

    // Método para verificar la conexión
    public function verificarConexion()
    {
        if ($this->conexion) {
            echo "Conexión exitosa a la base de datos."; // Mensaje de conexión exitosa
        } else {
            echo "No se pudo establecer la conexión."; // Mensaje de error de conexión
        }
    }

    // Método para cerrar la conexión (opcional)
    public function cerrar()
    {
        $this->conexion = null; // Destruir la conexión
    }

    // Nuevo método para obtener la conexión
    public function getConexion()
    {
        return $this->conexion;
    }
}

function registrarUsuario($nombre_usuario, $correo, $contrasena) {
    $db = Database::getInstance();
    $conn = $db->getConexion();

    // Encriptar la contraseña
    $contrasena_encriptada = password_hash($contrasena, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (nombre_usuario, correo_electronico, contrasena) VALUES (?, ?, ?)";
    $values = [$nombre_usuario, $correo, $contrasena_encriptada];

    return $db->ejecutar($sql, $values);
}

// Función para iniciar sesión
function iniciarSesion($nombre_usuario, $contrasena) {
    $db = Database::getInstance();
    $conn = $db->getConexion();

    $sql = "SELECT * FROM usuarios WHERE nombre_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$nombre_usuario]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && password_verify($contrasena, $result["contrasena"])) {
        // Iniciar sesión (por ejemplo, usando session_start())
        return true;
    }
    return false;
}

// Uso de la clase
$db = Database::getInstance();
$db->verificarConexion(); // Verificar conexión

?>