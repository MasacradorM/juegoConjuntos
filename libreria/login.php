<?php

include('conexion.php');

function validarUsuario($email, $password) {
    $db = Database::getInstance();
    $conn = $db->getConexion();

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE correo_electronico = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario && password_verify($password, $usuario['contrasena'])) {
        return $usuario; // Usuario encontrado y contraseña correcta
    }
    return false; // Usuario no encontrado o contraseña incorrecta
}

// Función para registrar un nuevo usuario
function registrarUsuario($email, $password, $nombre) {
    $db = Database::getInstance();
    $conn = $db->getConexion();

    // Verificar si el correo electrónico ya existe
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE correo_electronico = ?");
    $stmt->execute([$email]);
    $result = $stmt->fetch();

    if ($result) {
        return false; // Email ya existe
    }

    // Hashear la contraseña
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insertar datos del usuario en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (correo_electronico, contrasena, nombre_usuario) VALUES (?, ?, ?)");
    return $stmt->execute([$email, $hashedPassword, $nombre]);
}

// Manejar el envío del formulario (tanto login como registro)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['login'])) {
        // Manejar el inicio de sesión
        $email = $_POST['loginUsuario'];
        $password = $_POST['contrasena'];

        $usuario = validarUsuario($email, $password);

        if ($usuario) {
            // Inicio de sesión exitoso, iniciar sesión
            session_start();
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nombre'] = $usuario['nombre_usuario'];
            header("Location: dashboard.php"); // Redirigir al panel de control
            exit();
        } else {
            echo "<script>document.getElementById('message').innerHTML = 'Email o contraseña incorrectos';</script>";
        }
    } elseif (isset($_POST['register'])) {
        // Manejar el registro
        $email = $_POST['registerEmail'];
        $password = $_POST['registerPassword'];
        $nombre = $_POST['registerName'];

        if (registrarUsuario($email, $password, $nombre)) {
            // Registro exitoso, redireccionar al login
            header("Location: login.php");
            exit();
        } else {
            echo "<script>document.getElementById('message').innerHTML = 'El correo electrónico ya está en uso';</script>";
        }
    }
}

?>