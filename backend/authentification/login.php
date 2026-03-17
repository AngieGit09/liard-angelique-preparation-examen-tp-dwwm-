<?php

// ===== AUTHENTIFICATION ADMIN =====
// Permet à un administrateur de se connecter.
// Vérifie les identifiants et initialise la session.

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

// Autorise les requêtes
setCorsHeadersPublic();

// Format JSON
header('Content-Type: application/json');

// Démarre la session
session_start();

// Récupère les données envoyées (username + password)
$data = json_decode(file_get_contents('php://input'), true);

$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

// Vérifie que les champs sont remplis
if (!$username || !$password) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Champs manquants"
    ]);

    exit;
}

try {

    // ==== RÉCUPÉRATION DE L'ADMIN ====
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
    $stmt->execute([$username]);

    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // ==== VÉRIFICATION DU MOT DE PASSE ====
    if ($admin && password_verify($password, $admin['password_hash'])) {

        // Sécurité : empêche le vol de session
        session_regenerate_id(true);

        // Stocke les infos en session
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

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Erreur serveur"
    ]);
}
?>