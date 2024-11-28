<?php
ob_start();
session_start();
header('Content-Type: application/json');
require_once 'Database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $loginUsuario = $_POST['loginUsuario'] ?? '';
    $contrasena = $_POST['contrasena'] ?? '';

    if (empty($loginUsuario) || empty($contrasena)) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Por favor, complete todos los campos.']);
        exit;
    }

    try {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $loginUsuario, );
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (password_verify($contrasena, $user['contrasena'])) {
                $_SESSION['usuarioId'] = $user['usuariosid'];
                $_SESSION['nombre'] = $user['nombre'];
                ob_end_clean();
                echo json_encode(['success' => true,
                'email' => $loginUsuario,
                'nombre' => $user['nombre'],  // El nombre del usuario es enviado en la respuesta
                'usuarioId' => $user['usuariosid'],  // El nombre del usuario es enviado en la respuesta
            ]);
            } else {
                ob_end_clean();
                echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
            }
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
        }
    } catch (PDOException $e) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Error en la consulta: ' . $e->getMessage()]);
    }
}
?>