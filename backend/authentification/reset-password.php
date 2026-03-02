<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

setCorsHeadersPublic();

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$token = $data['token'] ?? null;
$newPassword = $data['password'] ?? null;

if (!$token || !$newPassword) {
    http_response_code(400);
    echo json_encode(["error" => "Données manquantes"]);
    exit;
}

try {

    // Vérifier token valide + non expiré
    $stmt = $pdo->prepare("
        SELECT id, reset_expires
        FROM admins
        WHERE reset_token = ?
    ");

    $stmt->execute([$token]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$admin) {
        http_response_code(400);
        echo json_encode(["error" => "Token invalide"]);
        exit;
    }

    // Vérifier expiration
    if (strtotime($admin['reset_expires']) < time()) {
        http_response_code(400);
        echo json_encode(["error" => "Token expiré"]);
        exit;
    }

    // Hash sécurisé du nouveau mot de passe
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Mise à jour password + suppression token
    $update = $pdo->prepare("
        UPDATE admins
        SET password_hash = ?,
            reset_token = NULL,
            reset_expires = NULL
        WHERE id = ?
    ");

    $update->execute([$hashedPassword, $admin['id']]);

    echo json_encode([
        "success" => true,
        "message" => "Mot de passe réinitialisé avec succès"
    ]);

} catch (Exception $e) {

    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}