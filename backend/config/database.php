<?php
// ==== CONNEXION PDO ====
// Fichier de configuration de la connexion à la base de données

// Charger l'autoload de Composer (phpdotenv)
require_once __DIR__ . '/../vendor/autoload.php';

// Charger le fichier .env situé à la racine du projet
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

// Paramètres de connexion (sécurisés via .env)
$host     = $_ENV['DB_HOST'] ?? 'localhost';
$dbname   = $_ENV['DB_NAME'] ?? 'renomeuble_db';
$username = $_ENV['DB_USER'] ?? 'renomeuble_user';
$password = $_ENV['DB_PASS'] ?? '';

try {
    // Création de la connexion PDO MySQL
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    // Mode erreur en exception (important pour les API)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retour en tableau associatif (parfait pour JSON)
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur de connexion : " . $e->getMessage()
    ]);
    exit;
}