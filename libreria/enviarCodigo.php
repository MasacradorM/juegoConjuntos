<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

session_start(); 

// Generar un código aleatorio de 6 dígitos
$codigo = rand(100000, 999999);

// Almacenar el código en la sesión para su validación más tarde
$_SESSION['codigo_verificacion'] = $codigo;

// Obtener el correo electrónico del formulario
$email = $_POST['email'];

// Crear una instancia de PHPMailer
$mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = SMTP::DEBUG_OFF; 
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'tresureandsets@gmail.com'; 
        $mail->Password   = 'bwnkuhngogartddv'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('tresureandsets@gmail.com', 'Tresure And Sets');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Administrador Tresure And Sets';
        $mail->Body = "Hola, <br>Hemos recibido tu solicitud de recuperación de contraseña.<br>Tu código de verificación es: <strong>$codigo</strong><br>Este código expirará en 30 minutos.";

        $mail->AltBody = "Tu código de verificación es: $codigo"; 

        $mail->send();
        echo 'El código ha sido enviado a tu correo.';
        header("Location: ../codigo.html");
        exit();
    
    } catch (Exception $e) {
        echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
    }
    
    ?>