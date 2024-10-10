<?php

class Database {
    private static $instance = null; // Instancia Singleton
    private $dsn;
    private $server;
    private $usuario;
    private $baseDatos;
    private $password;
    private $conexion;

    private function __construct()
    {
        // Utiliza variables de entorno para las credenciales
        $this->server = getenv('DB_SERVER') ?: "localhost";
        $this->usuario = getenv('DB_USER') ?: "postgres";
        $this->baseDatos = getenv('DB_NAME') ?: "juegoConjuntos";
        $this->password = getenv('DB_PASS') ?: "1077225941"; // Considera cambiar a una variable de entorno
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
            // Manejar error de conexión (considera registrar en lugar de mostrar)
            error_log("Error de conexión: " . $e->getMessage()); // Registrar el error
            return null; // Retorna null si no se conectó
        }
    }

    // Método para ejecutar consultas sin retorno de valores
    public function ejecutar($sqlQuery, $values = [])
    {
        if ($this->conexion) {
            $consulta = $this->conexion->prepare($sqlQuery);
            $consulta->execute($values);
            return $consulta->rowCount(); // Devuelve el número de filas afectadas
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


}

// Uso de la clase
$db = Database::getInstance();
$db->verificarConexion(); // Verificar conexión




?>