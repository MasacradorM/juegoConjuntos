<?php
$error = isset($_GET['error']) ? $_GET['error'] : '';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Error</title>
</head>
<body>
    <h2>Error</h2>
    <?php if ($error === 'invalid_code'): ?>
        <p>El código ingresado es incorrecto. Por favor, verifica tu correo y vuelve a intentarlo.</p>
    <?php else: ?>
        <p>Ocurrió un error inesperado. Por favor, intenta de nuevo.</p>
    <?php endif; ?>
</body>
</html>
