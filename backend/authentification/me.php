<?php

// ===== VÉRIFICATION DE SESSION ADMIN =====
// Permet de vérifier si un administrateur est connecté.
// Retourne les informations de session si authentifié.

require_once __DIR__ . '/../config/cors.php';

// Autorise les requêtes CORS
setCorsHeadersPublic();

// Format JSON
header('Content-Type: application/json');

// Démarre la session
session_start();

// Vérifie la présence de l'utilisateur en session
if (!isset($_SESSION['admin_id'])) {

    http_response_code(401);

    echo json_encode([
        "error" => "Non autorisé"
    ]);

    exit;
}

// ==== RETOUR DES INFOS ADMIN ====
echo json_encode([
    "id" => $_SESSION['admin_id'],
    "username" => $_SESSION['admin_username']
]);
?>