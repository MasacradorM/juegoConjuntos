<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_BCRYPT);

    $db = Database::getInstance()->getConnection();
    
    $stmt = $db->prepare("INSERT INTO usuarios (email, contrasena) VALUES (:email, :contrasena)");
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':contrasena', $contrasena);
    
    if ($stmt->execute()) {
        echo "Usuario registrado exitosamente.";
    } else {
        echo "Error al registrar el usuario.";
    }
}
?>
