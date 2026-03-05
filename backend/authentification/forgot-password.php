<?php

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

setCorsHeadersPublic();
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? null;

if (!$email) {
    http_response_code(400);
    echo json_encode(["error" => "Email requis"]);
    exit;
}

try {

    $stmt = $pdo->prepare("SELECT id FROM admins WHERE email = ?");
    $stmt->execute([$email]);

    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$admin) {
        http_response_code(404);
        echo json_encode([
            "error" => "Adresse mail inconnue"
        ]);
        exit;
    }

    $token = bin2hex(random_bytes(32));

    $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

    $update = $pdo->prepare("
        UPDATE admins
        SET reset_token = ?, reset_expires = ?
        WHERE id = ?
    ");

    $update->execute([$token, $expires, $admin['id']]);

    $resetLink = "http://localhost:5173/reset-password?token=" . $token;

    echo json_encode([
        "success" => true,
        "message" => "Lien de réinitialisation généré",
        "reset_link" => $resetLink
    ]);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}