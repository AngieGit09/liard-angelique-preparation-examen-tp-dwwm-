<?php

// ===== DEMANDE DE RÉINITIALISATION =====
// Génère un token sécurisé et un lien de réinitialisation.
// Ce lien sera utilisé pour changer le mot de passe.

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

// Autorise les requêtes
setCorsHeadersPublic();

// Format JSON
header('Content-Type: application/json');

// Récupère l'email envoyé
$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? null;

// Vérifie que l'email est fourni
if (!$email) {
    http_response_code(400);
    echo json_encode(["error" => "Email requis"]);
    exit;
}

try {

    // ==== VÉRIFICATION DE L'EMAIL ====
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

    // ==== GÉNÉRATION DU TOKEN ====

    // Token sécurisé (64 caractères hex)
    $token = bin2hex(random_bytes(32));

    // Date d'expiration (1 heure)
    $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

    // Stocke le token en base
    $update = $pdo->prepare("
        UPDATE admins
        SET reset_token = ?, reset_expires = ?
        WHERE id = ?
    ");

    $update->execute([$token, $expires, $admin['id']]);

    // ==== CRÉATION DU LIEN ====
    $resetLink = "http://localhost:5173/reset-password?token=" . $token;

    echo json_encode([
        "success" => true,
        "message" => "Lien de réinitialisation généré",
        "reset_link" => $resetLink
    ]);

} catch (Exception $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}
?>