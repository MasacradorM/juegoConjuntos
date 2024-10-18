<?php
require_once 'Database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $username = $_POST['username'] ?? '';

    // Verificar si los campos están vacíos
    if (empty($email) || empty($password) || empty($username)) {
        die("Por favor, complete todos los campos.");
    }

    try {
        $db = Database::getInstance()->getConnection();

        // Comprobar si el usuario ya existe
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo "El correo electrónico ya está registrado.";
        } else {
            // Encriptar la contraseña
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            // Insertar nuevo usuario en la base de datos
            $stmt = $db->prepare("INSERT INTO usuarios (email, contrasena, nombre) VALUES (:email, :contrasena, :nombre)");
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':contrasena', $hashedPassword);
            $stmt->bindParam(':nombre', $username);
            $stmt->execute();

            echo "Registro exitoso. Ahora puedes iniciar sesión.";
            // Redirigir a la página de inicio de sesión si deseas
            // header("Location: ../login.html");
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
