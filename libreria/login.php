<?php
session_start(); // Inicia la sesión
require_once 'Database.php'; // Asegúrate de que la ruta sea correcta

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $loginUsuario = $_POST['loginUsuario'] ?? '';
    $contrasena = $_POST['contrasena'] ?? '';

    // Comprueba si los campos están vacíos
    if (empty($loginUsuario) || empty($contrasena)) {
        die("Por favor, complete todos los campos.");
    }

    try {
        // Conectar a la base de datos
        $db = Database::getInstance()->getConnection();
        
        // Preparar la consulta para buscar al usuario por email
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $loginUsuario);
        $stmt->execute();

        // Verificar si se encontró un usuario
        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Compara la contraseña usando password_verify
            if ($user && password_verify(trim($contrasena), trim($user['contrasena']))) {
                // Si la contraseña es correcta, guarda información en la sesión
                $_SESSION['usuarioId'] = $user['usuariosId'];
                $_SESSION['nombre'] = $user['nombre'];
                header("Location: ../inicio.html"); // Ajusta la ruta si es necesario
                exit();
            } else {
                echo "Usuario o contraseña incorrectos.";
            }
        } else {
            echo "Usuario o contraseña incorrectos.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
