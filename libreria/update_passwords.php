<?php
require_once 'Database.php'; // Asegúrate de que la ruta sea correcta

try {
    // Conectar a la base de datos
    $db = Database::getInstance()->getConnection();
    
    // Preparar y ejecutar la consulta para eliminar espacios en las contraseñas
    $stmt = $db->prepare("UPDATE usuarios SET contrasena = TRIM(contrasena)");
    $stmt->execute();
    
    echo "Contraseñas actualizadas correctamente.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
