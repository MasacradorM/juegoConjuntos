<?php

class Database {
    private $host;
    private $dbname;
    private $user;
    private $password;
    private $pdo;

    public function __construct($host, $dbname, $user, $password) {
        $this->host = $host;
        $this->dbname = $dbname;
        $this->user = $user;
        $this->password = $password;
        $this->connect();
    }

    private function connect() {
        try {
            $dsn = "pgsql:host={$this->host};dbname={$this->dbname}";
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

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $username = $_POST['username'];
        $password = $_POST['password'];
    
        $stmt = $pdo->prepare('SELECT * FROM usuarios WHERE username = :username');
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();
    
        if ($user && password_verify($password, $user['password'])) {
            echo 'Login exitoso';
        } else {
            echo 'Usuario o contraseña incorrectos';
        }
    }

}

// Uso de la clase Database
$host = 'localhost'; // Cambia esto según tu configuración
$dbname = 'juego';
$user = 'postgre';
$password = "";

$db = new Database($host, $dbname, $user, $password);
$connection = $db->getConnection();

?>
