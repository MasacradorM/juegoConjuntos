<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';
require 'Database.php'; 

session_start(); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']); 

    $db = Database::getInstance();
    $connection = $db->getConnection();

    $query = "SELECT * FROM usuarios WHERE email = :email"; 
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        die('El email no existe en nuestra base de datos.');
    }

    $codigo = str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT); // Genera un código de 6 dígitos

    // Almacena el código en la base de datos para el email correspondiente
    $query = "UPDATE usuarios SET codigo = :codigo, verificado = false WHERE email = :email";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':codigo', $codigo);
    $stmt->bindParam(':email', $email);
    $stmt->execute();



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
        header("Location: ../codigo.html");
        exit();
    } catch (Exception $e) {
        echo "El mensaje no pudo ser enviado. Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Método no permitido.";
}
