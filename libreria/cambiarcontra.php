<?php
session_start();
require_once 'Database.php'; // Incluye tu archivo de conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener las contraseñas y el email del formulario
    $nueva_contrasena = $_POST['nueva_contrasena'];
    $confirmar_contrasena = $_POST['confirm_password'];
    $email = $_SESSION['email']; // Suponiendo que el correo está guardado en la sesión después de la verificación del código

    // Verifica que las contraseñas coincidan
    if ($nueva_contrasena === $confirmar_contrasena) {
        // Encriptar la nueva contraseña
        $nueva_contrasena_hash = password_hash($nueva_contrasena, PASSWORD_BCRYPT);

        // Conectar a la base de datos
        $db = Database::getInstance();
        $conn = $db->getConnection();

        // Verificar si el correo existe en la base de datos
        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            // El email está registrado, proceder a actualizar la contraseña
            $update_stmt = $conn->prepare("UPDATE usuarios SET contrasena = ? WHERE email = ?");
            $update_stmt->execute([$nueva_contrasena_hash, $email]);

            if ($update_stmt->rowCount() > 0) {
                // Contraseña actualizada con éxito
                echo "<script>alert('Contraseña cambiada correctamente.'); window.location.href='../login.html';</script>";
            } else {
                echo "<script>alert('Hubo un problema al actualizar la contraseña. Inténtalo nuevamente.');</script>";
            }
        } else {
            echo "<script>alert('El correo no está registrado.');</script>";
        }
    } else {
        echo "<script>alert('Las contraseñas no coinciden.');</script>";
    }
}
?>
