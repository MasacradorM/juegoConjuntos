<?php
require_once 'Database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $codigoIngresado = $_POST['codigo_verificacion'];

    try {
        // Conectar a la base de datos
        $db = Database::getInstance();
        $conn = $db->getConnection();

        // Obtener el código de verificación de la base de datos
        $query = $conn->prepare("SELECT * FROM usuarios_temporales WHERE email = :email");
        $query->bindParam(':email', $email);
        $query->execute();

        if ($query->rowCount() == 1) {
            $usuario = $query->fetch(PDO::FETCH_ASSOC);
            $codigoCorrecto = $usuario['codigo_verificacion'];

            if ($codigoIngresado == $codigoCorrecto) {
                // Mover el usuario de usuarios_temporales a usuarios
                $insertQuery = $conn->prepare("INSERT INTO usuarios (email, contrasena, nombre) 
                                               VALUES (:email, :contrasena, :nombre)");
                $insertQuery->bindParam(':email', $usuario['email']);
                $insertQuery->bindParam(':contrasena', $usuario['contrasena']);
                $insertQuery->bindParam(':nombre', $usuario['nombre']);
                $insertQuery->execute();

                // Eliminar el registro de usuarios_temporales
                $deleteQuery = $conn->prepare("DELETE FROM usuarios_temporales WHERE email = :email");
                $deleteQuery->bindParam(':email', $email);
                $deleteQuery->execute();

                echo "Tu cuenta ha sido verificada exitosamente.";
                header("Location: login.html");
                exit();
            } else {
                echo "El código de verificación es incorrecto.";
            }
        } else {
            echo "No se encontró ninguna cuenta temporal con este correo.";
        }

    } catch (PDOException $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }
}
?>
