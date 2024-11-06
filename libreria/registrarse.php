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
    $query = "INSERT INTO usuarios (email, contrasena, nombre) 
              VALUES (:email, :contrasena, :nombre)";
    $params = [
        ':email' => $email,
        ':contrasena' => $password,
        ':nombre' => $username,
    ];

    try {
        // Intentar ejecutar la consulta
        if ($db->execute($query, $params)) {
            echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al registrar en la base de datos']);
        }
    } catch (PDOException $e) {
        // Manejo del error en caso de duplicación de nombre o email
        if ($e->getCode() == '23505') { // 23505 es el código de error de unicidad en PostgreSQL
            echo json_encode(['success' => false, 'message' => 'El nombre de usuario o correo electrónico ya existe, elige otro.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error en la consulta: ' . $e->getMessage()]);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos', 'post' => $_POST]);
}
?>
