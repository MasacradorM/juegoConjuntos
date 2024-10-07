<?php
session_start();
if (isset($_SESSION['error_login'])) {
    echo json_encode(['error' => $_SESSION['error_login']]);
    unset($_SESSION['error_login']);
} else {
    echo json_encode(['error' => null]);
}
?>