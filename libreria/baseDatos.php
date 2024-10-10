<?php

class Database {
    private $host;
    private $dbname;
    private $user;
    private $password;
    private $port;
    private $pdo;

    public function __construct() {
        $this->host = "localhost";
        $this->dbname = "juegoConjuntos";
        $this->user = "postgres";
        $this->password = "1077225941";
        $this->port = "5432";
        $this->connect();
    }

    private function connect() {
        try {
            // Incluir el puerto en el DSN
            $dsn = "pgsql:host={$this->host};port={$this->port};dbname={$this->dbname}";
            $this->pdo = new PDO($dsn, $this->user, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Conexión exitosa a la base de datos.";
        } catch (PDOException $e) {
            echo "Error en la conexión: " . $e->getMessage();
        }
    }

    public function getConnection() {
        return $this->pdo;
    }
}

?>
