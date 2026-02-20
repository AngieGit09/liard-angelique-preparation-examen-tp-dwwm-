<?php
// ========= API AUTHENTIFICATION - DECONNEXION ADMIN (LOGOUT) =========
// Endpoint permettant de détruire la session administrateur.
// Utilisé pour sécuriser la déconnexion du back-office.


// Définit le format de réponse en JSON pour la communication avec le front React
header('Content-Type: application/json');

// Autorise les requêtes CORS depuis l’application front-end (React)
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l’envoi et la gestion des cookies de session (authentification PHP)
header('Access-Control-Allow-Credentials: true');

// Démarrage de la session afin d’accéder aux données de session existantes
session_start();

// Suppression de toutes les variables de session (admin_id, admin_username, etc.)
session_unset();

// Destruction complète de la session côté serveur (sécurité)
session_destroy();

// Réponse JSON confirmant la déconnexion au front-end
echo json_encode(['success' => true]);