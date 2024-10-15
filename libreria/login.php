<?php

include ('baseDatos.php');

class User {
    private $conn;
    private $table_name = "loginSystem";
    public $id;
    public $username;
    public $password;
    public $email;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login() {
        $query = "SELECT loginSystemId, loginUsuario, contraseña, emailId 
                  FROM " . $this->table_name . " 
                  WHERE loginUsuario = :username";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $this->username);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row && $this->password === $row['contraseña']) {
            $this->id = $row['loginSystemId'];
            $this->email = $row['emailId'];
            return true;
        }

        return false;
    }

    public function getUserData() {
        $query = "SELECT loginUsuario, emailId 
                  FROM " . $this->table_name . " 
                  WHERE loginSystemId = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>

<?php
session_start();
header("Content-Type: application/json");


$database = new Database();
$db = $database->getConnection();

$user = new User($db);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user->username = $_POST['username'] ?? '';
    $user->password = $_POST['password'] ?? '';

    if ($user->login()) {
        $_SESSION['user_id'] = $user->id;
        $_SESSION['username'] = $user->username;
        echo json_encode(["success" => true, "message" => "Login successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid username or password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>