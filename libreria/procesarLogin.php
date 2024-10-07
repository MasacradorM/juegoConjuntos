<?php
session_start();
require_once 'conexion.php'; // Asegúrate de que este archivo contiene tu conexión PDO

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    try {
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = :email OR nombre_usuario = :email");
        $stmt->execute(['email' => $email]);
        $usuario = $stmt->fetch();

        if ($usuario && password_verify($password, $usuario['password_hash'])) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['nombre_usuario'] = $usuario['nombre_usuario'];
            header("Location: dashboard.php"); // Redirige a la página principal después del login
            exit();
        } else {
            $error = "Email/Usuario o contraseña incorrectos";
        }
    } catch(PDOException $e) {
        $error = "Error: " . $e->getMessage();
    }
}

if (isset($error)) {
    $_SESSION['error_login'] = $error;
    header("Location: iniciar.html");
    exit();
}
?>