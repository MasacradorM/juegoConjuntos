<?php
session_start();

// Validar el correo ingresado
$email = $_POST['email'];

// Almacenar el correo en la sesión para usarlo más adelante
$_SESSION['email'] = $email;

// Código de verificación aleatorio
$codigo = rand(100000, 999999);

// Almacenar el código de verificación en la sesión
$_SESSION['codigo_verificacion'] = $codigo;

// Aquí sigue la lógica de envío del correo (usando PHPMailer o similar)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'tresureandsets@gmail.com';
    $mail->Password = 'bwnkuhngogartddv'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('tresureandsets@gmail.com', 'Tresure And Sets');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = 'Administrador Tresure And Sets';
    $mail->Body = "Hola, <br>Hemos recibido tu solicitud de recuperación de contraseña.<br>Tu código de verificación es: <strong>$codigo</strong><br>Este código expirará en 30 minutos.";

    $mail->AltBody = "Tu código de verificación es: $codigo"; 

    $mail->send();

    // Redirige al usuario al formulario para ingresar el código
    header("Location: ../codigo.html");
    exit();

} catch (Exception $e) {
    echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
}
?>
