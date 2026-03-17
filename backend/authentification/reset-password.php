<?php

// ===== RÉINITIALISATION DU MOT DE PASSE =====
// Permet de définir un nouveau mot de passe via un token sécurisé.
// Vérifie la validité et l'expiration du token avant mise à jour.

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

// Autorise les requêtes front → back
setCorsHeadersPublic();

// Définit le format JSON
header('Content-Type: application/json');

// Récupère les données envoyées (token + nouveau mot de passe)
$data = json_decode(file_get_contents("php://input"), true);

$token = $data['token'] ?? null;
$newPassword = $data['password'] ?? null;

// Vérifie que les données sont présentes
if (!$token || !$newPassword) {

    http_response_code(400);

    echo json_encode([
        "error" => "Données manquantes"
    ]);

    exit;
}

try {

    // ==== VÉRIFICATION DU TOKEN ====
    $stmt = $pdo->prepare("
        SELECT id, reset_expires
        FROM admins
        WHERE reset_token = ?
    ");

    $stmt->execute([$token]);

    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // Token invalide
    if (!$admin) {

        http_response_code(400);

        echo json_encode([
            "error" => "Token invalide"
        ]);

        exit;
    }

    // Vérifie si le token est expiré
    if (strtotime($admin['reset_expires']) < time()) {

        http_response_code(400);

        echo json_encode([
            "error" => "Token expiré"
        ]);

        exit;
    }

    // ==== MISE À JOUR DU MOT DE PASSE ====

    // Hash sécurisé du mot de passe
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    $update = $pdo->prepare("
        UPDATE admins
        SET password_hash = ?, reset_token = NULL, reset_expires = NULL
        WHERE id = ?
    ");

    $update->execute([$hashedPassword, $admin['id']]);

    echo json_encode([
        "success" => true,
        "message" => "Mot de passe réinitialisé avec succès"
    ]);

} catch (Exception $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}
?>