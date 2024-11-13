<?php
session_start();
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$response = array();

if (isset($data['codigo'])) {
    if ($data['codigo'] == $_SESSION['codigo_verificacion']) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
    }
} else {
    $response['success'] = false;
}

echo json_encode($response);
?>