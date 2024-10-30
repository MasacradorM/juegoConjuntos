<?php
session_start();

// Verifica si el usuario ha llegado aquí después de validar el código
if (!isset($_SESSION['email'])) {
    header("Location: error.php?error=access_denied");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Conectar a la base de datos
    require 'Database.php';
    $db = Database::getInstance();
    $connection = $db->getConnection();

    // Limpiar la nueva contraseña
    $nuevaContrasena = trim($_POST['nueva_contrasena']);
    $confirmarContrasena = trim($_POST['confirm_password']);

    // Verificar que las contraseñas coincidan
    if ($nuevaContrasena !== $confirmarContrasena) {
        echo "Las contraseñas no coinciden. Inténtalo de nuevo.";
        exit();
    }

    // Hashear la nueva contraseña
    $hashedPassword = password_hash($nuevaContrasena, PASSWORD_DEFAULT);

    // Actualizar la contraseña en la base de datos
    $email = $_SESSION['email'];
    $updateQuery = "UPDATE usuarios SET password = :password WHERE email = :email";
    $stmt = $connection->prepare($updateQuery);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':email', $email);

    if ($stmt->execute()) {
        echo "Contraseña restablecida con éxito. Puedes iniciar sesión.";
        // Limpiar la sesión
        session_destroy();
        // Redirigir a la página de inicio de sesión o donde quieras
        header("Location: login.php");
        exit();
    } else {
        echo "Error al restablecer la contraseña. Inténtalo de nuevo.";
    }
} else {
    echo "Método no permitido.";
}