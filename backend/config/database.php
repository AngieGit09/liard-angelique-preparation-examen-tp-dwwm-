<?php

// ===== CONNEXION À LA BASE DE DONNÉES =====
// Initialise la connexion PDO en utilisant des variables d'environnement (.env).
// Permet une connexion sécurisée et réutilisable dans toute l'application.

// Charger l'autoload de Composer (nécessaire pour phpdotenv)
require_once __DIR__ . '/../vendor/autoload.php';

// Charger les variables d'environnement depuis le fichier .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

// ==== PARAMÈTRES DE CONNEXION ====
// Récupérés depuis le .env avec valeurs par défaut si absentes

$host     = $_ENV['DB_HOST'] ?? 'localhost';
$dbname   = $_ENV['DB_NAME'] ?? 'renomeuble_db';
$username = $_ENV['DB_USER'] ?? 'renomeuble_user';
$password = $_ENV['DB_PASS'] ?? '';

try {
    // ==== CRÉATION DE LA CONNEXION PDO ====
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    // Active les erreurs sous forme d'exceptions (debug + sécurité)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retourne les résultats sous forme de tableaux associatifs (idéal pour JSON)
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {

    // ==== GESTION DES ERREURS DE CONNEXION ====

    http_response_code(500);

    echo json_encode([
        "error" => "Erreur de connexion : " . $e->getMessage()
    ]);

    exit;
}
?>