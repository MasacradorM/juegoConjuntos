<?php
session_start();
session_unset();
session_destroy();

// Respuesta JSON indicando éxito
echo json_encode(['status' => 'success']);
exit;
?>
