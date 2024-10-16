<?php
include 'conexion.php';

// Activar la visualización de errores (solo para desarrollo)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['register'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $username = $_POST['username'];

    // Logging para debug
    error_log("Intento de registro - Email: $email, Username: $username");

    $db = Database::getInstance();
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (nombre_usuario, correo_electronico, contrasena) VALUES (?, ?, ?)";
    $values = [$username, $email, $hashedPassword];

    try {
        if ($db->ejecutar($sql, $values)) {
            error_log("Usuario registrado con éxito");
            echo "Usuario registrado con éxito";
            // Redirigir al login después de un registro exitoso
            header("Location: ../login.html");
            exit();
        } else {
            throw new Exception("Error al registrar el usuario");
        }
    } catch (Exception $e) {
        error_log("Error en registrar.php: " . $e->getMessage());
        echo "Error al registrar el usuario: " . $e->getMessage();
    }
} else {
    error_log("Acceso incorrecto a registrar.php");
    echo "Acceso incorrecto";
}
?>