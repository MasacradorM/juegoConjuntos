<?php
require_once 'Database.php'; // Asegúrate de que la ruta sea correcta

try {
    // Conectar a la base de datos
    $db = Database::getInstance()->getConnection();

    // Obtener todas las contraseñas actuales
    $stmt = $db->query("SELECT usuariosId, contrasena FROM usuarios");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Preparar la consulta para actualizar las contraseñas
    $updateStmt = $db->prepare("UPDATE usuarios SET contrasena = :contrasena WHERE usuariosId = :usuariosId");

    foreach ($usuarios as $usuario) {
        // Encriptar la contraseña
        $hashedPassword = password_hash($usuario['contrasena'], PASSWORD_DEFAULT);

        // Actualizar la contraseña en la base de datos
        $updateStmt->execute([
            ':contrasena' => $hashedPassword,
            ':usuariosId' => $usuario['usuariosId']
        ]);
    }

    echo "Contraseñas actualizadas correctamente.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
