<?php

// ===== CONFIGURATION CORS =====
// Autorise les requêtes entre le front (React) et le back (API PHP).
// Indispensable pour éviter les erreurs de type "CORS policy".

function setCorsHeadersPublic()
{
    // Définit le format de réponse en JSON
    header("Content-Type: application/json");

    // Autorise uniquement ton front local (sécurité)
    header("Access-Control-Allow-Origin: http://localhost:5173");

    // Autorise l'envoi de cookies / sessions
    header("Access-Control-Allow-Credentials: true");

    // Méthodes HTTP autorisées
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    // Headers autorisés dans les requêtes
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // ==== GESTION DES REQUÊTES PREFLIGHT ====
    // Le navigateur envoie une requête OPTIONS avant certaines requêtes (POST, PUT...)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

        http_response_code(200);

        // Stoppe ici pour éviter d'exécuter le reste du script
        exit;
    }
}
?>