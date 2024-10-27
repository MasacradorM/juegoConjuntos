<?php
session_start();
header('Content-Type: application/json');
require_once 'Database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $loginUsuario = $_POST['loginUsuario'] ?? '';
    $contrasena = $_POST['contrasena'] ?? '';

    if (empty($loginUsuario) || empty($contrasena)) {
        echo json_encode(['success' => false, 'message' => 'Por favor, complete todos los campos.']);
        exit;
    }

    try {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $loginUsuario);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (password_verify($contrasena, $user['contrasena'])) {
                $_SESSION['usuarioId'] = $user['usuariosId'];
                $_SESSION['nombre'] = $user['nombre'];
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error en la consulta: ' . $e->getMessage()]);
    }
}
?>
