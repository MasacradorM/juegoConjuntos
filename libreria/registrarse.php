<?php
require 'path/to/PHPMailer/PHPMailerAutoload.php';  // Incluir PHPMailer

// Incluir la clase Database que maneja la conexión
require_once 'Database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $contrasena = trim($_POST['contrasena']);
    $nombre = trim($_POST['nombre']);

    // Validar el formato del correo electrónico
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "El correo electrónico no es válido.";
        exit();
    }

    // Verificar que los campos no estén vacíos
    if (empty($email) || empty($contrasena) || empty($nombre)) {
        echo "Todos los campos son obligatorios.";
        exit();
    }

    try {
        // Conectar a la base de datos
        $db = Database::getInstance();
        $conn = $db->getConnection();

        // Verificar si el correo ya está registrado
        $query = $conn->prepare("SELECT * FROM usuarios WHERE email = :email");
        $query->bindParam(':email', $email);
        $query->execute();

        if ($query->rowCount() > 0) {
            echo "Este correo electrónico ya está registrado.";
            exit();
        }

        // Encriptar la contraseña
        $contrasenaEncriptada = password_hash($contrasena, PASSWORD_DEFAULT);

        // Generar un código de verificación aleatorio
        $codigoVerificacion = rand(100000, 999999);

        // Insertar el usuario en la tabla temporal
        $insertQuery = $conn->prepare("INSERT INTO usuarios_temporales (email, contrasena, nombre, codigo_verificacion) 
                                        VALUES (:email, :contrasena, :nombre, :codigo_verificacion)");
        $insertQuery->bindParam(':email', $email);
        $insertQuery->bindParam(':contrasena', $contrasenaEncriptada);
        $insertQuery->bindParam(':nombre', $nombre);
        $insertQuery->bindParam(':codigo_verificacion', $codigoVerificacion);
        $insertQuery->execute();

        // Enviar el correo de verificación
        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'tu_correo@gmail.com'; // Reemplaza con tu correo
        $mail->Password = 'tu_contrasena'; // Reemplaza con la contraseña de tu correo
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('tu_correo@gmail.com', 'Nombre de tu sitio');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Código de Verificación';
        $mail->Body = "Hola $nombre,<br><br>Tu código de verificación es: <strong>$codigoVerificacion</strong><br><br>Por favor ingresa este código en el formulario.";

        if (!$mail->send()) {
            echo 'No se pudo enviar el correo. Error: ' . $mail->ErrorInfo;
            exit();
        } else {
            // Redirigir a codigo.html, pasando el email en la URL
            header("Location: codigo.html?email=" . urlencode($email));
            exit();
        }

    } catch (PDOException $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }
}
?>
