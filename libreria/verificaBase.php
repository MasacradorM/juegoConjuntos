<?php
require_once 'Database.php';

// Verifica si la clase Database está disponible
if (class_exists('Database')) {
    echo json_encode(['success' => true, 'message' => 'La clase Database está disponible.']);
    
    // Verifica la conexión a la base de datos
    $db = Database::getInstance();
    if ($db->checkConnection()) {
        echo json_encode(['success' => true, 'message' => 'Conexión a la base de datos exitosa.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No se pudo conectar a la base de datos.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'La clase Database no está disponible.']);
}
?>
