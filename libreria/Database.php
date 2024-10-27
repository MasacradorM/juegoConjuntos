<?php
class Database {
    private static $instance = null;
    private $connection;

    private function __construct() {
        try {
            $this->connection = new PDO('pgsql:host=localhost;dbname=juegoConjuntos', 'postgres', '123456');
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $e->getMessage()]);
            exit;
        }
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

    public function checkConnection() {
        try {
            // Realiza una consulta simple
            $stmt = $this->connection->query("SELECT 1");
            return $stmt !== false; // Retorna true si la consulta fue exitosa
        } catch (PDOException $e) {
            return false; // Retorna false si ocurre un error
        }
    }
    
    public function execute($query, $params = []) {
        $stmt = $this->connection->prepare($query);
        return $stmt->execute($params);
    }
}
?>
