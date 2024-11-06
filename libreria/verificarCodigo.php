<?php
session_start();

// Verificar si el código enviado en el formulario es correcto
if ($_POST['codigo'] == $_SESSION['codigo_verificacion']) {
    // Si es correcto, redirigir al usuario a la página de cambio de contraseña
    header("Location: ../cambiarContra.html");
    exit();
} else {
    // Si es incorrecto, mostrar un mensaje de error
    echo "El código es incorrecto. Por favor, intenta nuevamente.";
}
?>
