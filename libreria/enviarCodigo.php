<?php
session_start();

// Incluir los archivos necesarios de PHPMailer (sin Composer)
require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Conectar a la base de datos
require_once 'Database.php'; // Ajusta la ruta si es necesario

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];

    // Conectar a la base de datos
    $db = Database::getInstance();
    $conn = $db->getConnection();

    // Verificar si el correo existe en la base de datos
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        // El correo existe, generar código de verificación y enviarlo

        // Generar un código de verificación aleatorio
        $codigo = rand(100000, 999999);

        // Almacenar el código de verificación y el email en la sesión para usarlos más tarde
        $_SESSION['codigo_verificacion'] = $codigo;
        $_SESSION['email'] = $email;

        // Crear una instancia de PHPMailer
        $mail = new PHPMailer(true);
        try {
            // Configuración de PHPMailer
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'tresureandsets@gmail.com';  // Tu correo de Gmail
            $mail->Password = 'ueadaeroenqqpdzi';  // Tu contraseña de aplicación (no tu contraseña de Gmail)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;

            // Configuración del correo
            $mail->setFrom('tresureandsets@gmail.com', 'Tresure And Sets');
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = 'Administrador Tresure And Sets';
            $mail->Body = "Hola, <br>Hemos recibido tu solicitud de recuperación de contraseña.<br>Tu código de verificación es: <strong>$codigo</strong><br>Este código expirará en 30 minutos.";

            $mail->AltBody = "Tu código de verificación es: $codigo"; 

            // Enviar el correo
            $mail->send();

            // Redirigir al usuario a la página de verificación del código
            header("Location: ../codigo.html");
            exit();
        } catch (Exception $e) {
            echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
        }
    } else {
        // Si el correo no está registrado, mostrar un mensaje de error
        echo "<script>alert('El correo no está registrado. Por favor, ingresa un correo válido.'); window.location.href='../olvidaste.html';</script>";
    }
}
?>
