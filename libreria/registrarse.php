<?php
header('Content-Type: application/json');
require_once 'Database.php';

if (isset($_POST['email'], $_POST['password'], $_POST['username'])) {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encriptar la contraseña
    $username = $_POST['username'];
    
    // Generar un código de verificación
    $verificationCode = rand(100000, 999999);
    
    $db = Database::getInstance();
    $query = "INSERT INTO usuarios (email, contrasena, nombre, codigo, verificado) 
              VALUES (:email, :contrasena, :nombre, :codigo, false)";
    $params = [
        ':email' => $email,
        ':contrasena' => $password,
        ':nombre' => $username,
        ':codigo' => $verificationCode
    ];

    try {
        if ($db->execute($query, $params)) {
            echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al registrar en la base de datos']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error en la consulta: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos', 'post' => $_POST]);
}
?>
