<?php

// ===== DÉCONNEXION ADMIN =====
// Supprime la session active de l'utilisateur connecté.
// Permet de sécuriser la sortie de l'espace admin.

require_once __DIR__ . '/../config/cors.php';

// Autorise les requêtes front
setCorsHeadersPublic();

// Format JSON
header('Content-Type: application/json');

// Démarre la session pour pouvoir la détruire
session_start();

// Vide toutes les variables de session
$_SESSION = [];

// Détruit complètement la session
session_destroy();

// ==== RÉPONSE ====
echo json_encode([
    "success" => true,
    "message" => "Déconnexion réussie"
]);
?>