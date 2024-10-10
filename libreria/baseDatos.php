<?php

class Database {
    private $host;
    private $dbname;
    private $user;
    private $password;
    private $port;
    private $pdo;

    // Constructor
    public function __construct() {
        $this->host = "localhost";
        $this->dbname = "juegoConjuntos";  // Nombre correcto de la base de datos
        $this->user = "postgres";          // Usuario de PostgreSQL
        $this->password = "1077225941";    // Contraseña del usuario de PostgreSQL
        $this->port = "5432";              // Puerto de PostgreSQL (5432 por defecto)
        $this->connect();
    }

    // Método para realizar la conexión a la base de datos
    private function connect() {
        try {
            // Formato del DSN para PostgreSQL
            $dsn = "pgsql:host={$this->host};port={$this->port};dbname={$this->dbname}";
            
            // Crear una nueva instancia de PDO para la conexión
            $this->pdo = new PDO($dsn, $this->user, $this->password);
            
            // Configurar el manejo de errores para que arroje excepciones
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Mensaje de éxito
            echo "Conexión exitosa a la base de datos.<br>";
        } catch (PDOException $e) {
            // Mensaje en caso de error
            echo "Error en la conexión: " . $e->getMessage() . "<br>";
        }
    }

    // Método para obtener la conexión activa (PDO)
    public function getConnection() {
        return $this->pdo;
    }
}

?>
