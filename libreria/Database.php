<?php
class Database {
    private static $instance = null;
    private $connection;

    private function __construct() {
        $this->connection = new PDO('pgsql:host=localhost;dbname=juegoConjuntos', 'postgres', '123456');
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }
}
?>
