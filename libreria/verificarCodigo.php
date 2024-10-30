<?php
header('Content-Type: application/json');
require 'Database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['codigo']) && isset($data['email'])) {
        $codigoIngresado = $data['codigo'];
        $email = $data['email'];

        // Conectar a la base de datos
        $db = Database::getInstance();
        $connection = $db->getConnection();

        // Verificar el código y el estado 'verificado'
        $query = "SELECT * FROM usuarios WHERE email = :email AND codigo = :codigo AND verificado = false";
        $stmt = $connection->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':codigo', $codigoIngresado);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            // Código correcto, actualizar el estado a verificado
            $updateQuery = "UPDATE usuarios SET verificado = true WHERE email = :email";
            $updateStmt = $connection->prepare($updateQuery);
            $updateStmt->bindParam(':email', $email);
            $updateStmt->execute();

            echo json_encode(['success' => true]);
        } else {
            // Código incorrecto o el usuario ya está verificado
            echo json_encode(['success' => false, 'message' => 'Código incorrecto o el usuario ya ha sido verificado.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Datos faltantes.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>
