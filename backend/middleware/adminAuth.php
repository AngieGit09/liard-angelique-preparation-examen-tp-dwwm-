<?php

// ===== PROTECTION DES ROUTES ADMIN =====
// Vérifie que l'utilisateur est authentifié en tant qu'administrateur.
// Si ce n'est pas le cas, renvoie une erreur 401 (non autorisé).

require_once __DIR__ . '/../config/cors.php';

// Autorise les requêtes CORS (front → back)
setCorsHeadersPublic();
// Définit le type de réponse en JSON
header('Content-Type: application/json');

// Démarre la session pour accéder aux données utilisateur
session_start();

// Vérifie si un admin est connecté (présence de l'id en session)
if (!isset($_SESSION['admin_id'])) {

    // Code HTTP 401 = accès refusé
    http_response_code(401);

     // Réponse JSON d'erreur
    echo json_encode([
        "error" => "Non autorisé"
    ]);

    exit;
}
?>