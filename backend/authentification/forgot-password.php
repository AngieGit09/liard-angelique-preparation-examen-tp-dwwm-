<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

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

    // Vérifier email admin
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

    // Génération token sécurisé
    $token = bin2hex(random_bytes(32));

    // Expiration 1 heure
    $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

    // Stockage token
    $update = $pdo->prepare("
        UPDATE admins
        SET reset_token = ?, reset_expires = ?
        WHERE id = ?
    ");

    $update->execute([$token, $expires, $admin['id']]);

    // Lien reset (simulation email)
    $resetLink = "http://localhost:5173/reset-password?token=" . $token;

    echo json_encode([
        "success" => true,
        "message" => "Lien de réinitialisation généré",
        "reset_link" => $resetLink // simulation pour jury
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}