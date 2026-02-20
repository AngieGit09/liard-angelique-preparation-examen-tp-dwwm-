<?php
// ========= API AUTHENTIFICATION - CONNEXION ADMIN (LOGIN) =========
// Endpoint permettant l’authentification d’un administrateur.
// Vérifie les identifiants, crée une session sécurisée
// et autorise l’accès au back-office.

// Activation de l’affichage des erreurs (environnement de développement)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Configuration CORS pour autoriser le front React (localhost:5173)
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l’envoi des cookies de session (nécessaire pour l’authentification PHP)
header('Access-Control-Allow-Credentials: true');

// Méthodes HTTP autorisées pour cet endpoint
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Headers autorisés pour les requêtes API (JSON)
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Format de réponse standardisé en JSON (API REST)
header('Content-Type: application/json');

// Gestion de la requête preflight (OPTIONS) envoyée par le navigateur
// Permet la communication sécurisée entre le front et l’API
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Démarrage de la session PHP pour stocker l’authentification admin
session_start();

// Inclusion du fichier de connexion à la base de données (PDO sécurisé)
require_once '../config/database.php';

// Vérification que la requête est bien de type POST (connexion)
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Récupération et décodage des données JSON envoyées par le front-end
    $data = json_decode(file_get_contents('php://input'), true);

    // Nettoyage et sécurisation des entrées utilisateur
    $username = trim($data['username'] ?? '');
    $password = trim($data['password'] ?? '');

    // Validation des champs obligatoires
    if (empty($username) || empty($password)) {
        // Code HTTP 400 : requête invalide
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Champs manquants']);
        exit;
    }

    // Requête préparée pour récupérer l’administrateur (sécurité contre injections SQL)
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérification du mot de passe hashé avec password_verify (sécurité)
    if ($admin && password_verify($password, $admin['password_hash'])) {

        // Régénération de l’ID de session pour éviter les attaques de session fixation
        session_regenerate_id(true);

        // Stockage des informations admin en session (authentification persistante)
        $_SESSION['admin_id']       = $admin['id'];
        $_SESSION['admin_username'] = ucfirst($admin['username']);

        // Réponse de succès pour le front-end
        echo json_encode(['success' => true]);
    } else {
        // Code HTTP 401 : identifiants invalides
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Identifiants incorrects'
        ]);
    }
}