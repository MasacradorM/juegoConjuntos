<?php
session_start();
include 'db_connection.php'; // Asegúrate de incluir tu conexión a la base de datos

$codigoIngresado = $_POST['codigo'];
$email = $_POST['email'];

// Consulta para obtener el código correspondiente al email
$query = "SELECT codigo FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['codigo'] === $codigoIngresado) {
        // Código correcto
        echo json_encode(['success' => true]);
    } else {
        // Código incorrecto
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]); // Email no encontrado
}
?>
