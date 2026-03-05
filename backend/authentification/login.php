<?php

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

setCorsHeadersPublic();
header('Content-Type: application/json');

session_start();

$data = json_decode(file_get_contents('php://input'), true);

$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if (!$username || !$password) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Champs manquants"
    ]);

    exit;
}

try {

    $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
    $stmt->execute([$username]);

    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin && password_verify($password, $admin['password_hash'])) {

        session_regenerate_id(true);

        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_username'] = $admin['username'];

        echo json_encode([
            "success" => true
        ]);

    } else {

        http_response_code(401);

        echo json_encode([
            "success" => false,
            "message" => "Identifiants incorrects"
        ]);
    }

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Erreur serveur"
    ]);
}