<?php
session_start();
require_once 'Database.php';

// Verificar si el usuario está autenticado
if (isset($_SESSION['usuarioId'])) {
    $usuarioId = $_SESSION['usuarioId'];
} else {
    die('Error: El usuario no está autenticado.');
}

try {
    // Instanciar la base de datos
    $db = Database::getInstance();

    // Consulta para obtener la imagen asociada al usuario
    $sql = "SELECT imagen FROM perfil WHERE usuariosId = :usuariosId LIMIT 1";
    $params = [':usuariosId' => $usuarioId];
    $stmt = $db->query($sql, $params);

    // Verificar si hay resultados
    if ($stmt && $stmt->rowCount() > 0) {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $imagen = $result['imagen']; // Ruta de la imagen

        // Mostrar la ruta de la imagen
        echo json_encode(['status' => 'success', 'imagen' => $imagen]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No se encontró una imagen asociada a este usuario.']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error al recuperar la imagen: ' . $e->getMessage()]);
}
?>
