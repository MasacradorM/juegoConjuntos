<?php
session_start();

if (!isset($_SESSION['email'])) {
    header("Location: error.php?error=access_denied");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require 'Database.php';
    $db = Database::getInstance();
    $connection = $db->getConnection();

    $nuevaContrasena = trim($_POST['nueva_contrasena']);
    $confirmarContrasena = trim($_POST['confirm_password']);

    if ($nuevaContrasena !== $confirmarContrasena) {
        echo "Las contraseñas no coinciden. Inténtalo de nuevo.";
        exit();
    }

    $hashedPassword = password_hash($nuevaContrasena, PASSWORD_DEFAULT);
    $email = $_SESSION['email'];
    
    $updateQuery = "UPDATE usuarios SET contrasena = :contrasena WHERE email = :email";
    $stmt = $connection->prepare($updateQuery);
    $stmt->bindParam(':contrasena', $hashedPassword);
    $stmt->bindParam(':email', $email);

    if ($stmt->execute()) {
        echo "Contraseña restablecida con éxito.";
        session_destroy();
        header("Location: login.php");
        exit();
    } else {
        echo "Error al restablecer la contraseña. Inténtalo de nuevo.";
    }
} else {
    echo "Método no permitido.";
}
?>