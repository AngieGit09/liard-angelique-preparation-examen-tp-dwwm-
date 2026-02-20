<?php
// ========= API AUTHENTIFICATION - VERIFICATION SESSION ADMIN (ME) =========
// Endpoint permettant de vérifier si un administrateur est connecté.
// Retourne les informations de session pour sécuriser l’accès au back-office.

// Activation de l’affichage des erreurs (utile en environnement de développement)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Autorise les requêtes CORS depuis le front React (localhost:5173)
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l’envoi des cookies de session (nécessaire pour l’authentification)
header('Access-Control-Allow-Credentials: true');

// Définit le format de réponse de l’API en JSON
header('Content-Type: application/json');

// Démarrage de la session PHP pour accéder aux variables de session
session_start();

// Vérification de l’authentification administrateur
// Si aucune session admin n’existe, l’accès est refusé
if (!isset($_SESSION['admin_id'])) {
    // Code HTTP 401 : Non autorisé
    http_response_code(401);

    // Réponse JSON standardisée pour le front-end
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}

// Si l’administrateur est authentifié,
// renvoi des informations nécessaires au dashboard admin
echo json_encode([
    'id' => $_SESSION['admin_id'],
    'username' => $_SESSION['admin_username']
]);