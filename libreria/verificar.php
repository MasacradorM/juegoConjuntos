<?php
session_start();
include('Database.php');

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(!isset($_SESSION['codigo_verificacion'])) {
        echo json_encode(['status' => 'error', 'message' => 'Sesión expirada, por favor registrate nuevamente']);
        exit();
    }

    $codigo_ingresado = $_POST['codigo'] ?? '';
    
    if($codigo_ingresado == $_SESSION['codigo_verificacion']) {
        try {
            $db = Database::getInstance();
            $conn = $db->getConnection();
            
            // Insertar usuario en la base de datos
            $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)");
            $stmt->execute([
                $_SESSION['temp_nombre'],
                $_SESSION['temp_email'],
                $_SESSION['temp_contrasena']
            ]);
            
            // Limpiar variables de sesión
            unset($_SESSION['temp_email']);
            unset($_SESSION['temp_nombre']);
            unset($_SESSION['temp_contrasena']);
            unset($_SESSION['codigo_verificacion']);
            
            echo json_encode([
                'status' => 'success', 
                'message' => 'Registro completado exitosamente',
                'redirect' => 'login.html'  // Puedes cambiar esta URL según necesites
            ]);
            
        } catch(PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Error al registrar usuario']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Código incorrecto']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>