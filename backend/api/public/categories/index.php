<?php
// ========= API PUBLIC - LISTE DES CATEGORIES =========
// Endpoint public permettant de récupérer toutes les catégories
// disponibles pour alimenter dynamiquement le catalogue côté front React.


// ===== HEADERS =====
// Définit le format de réponse en JSON (standard API REST)
header('Content-Type: application/json');

// Autorise les requêtes depuis le front-end (React en local)
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l’utilisation des cookies si nécessaire (cohérence avec l’API globale)
header('Access-Control-Allow-Credentials: true');


// ===== CONNEXION BASE DE DONNEES =====
// Inclusion du fichier de configuration PDO sécurisé
require_once '../../../config/database.php';

try {

    // ===== RECUPERATION DES CATEGORIES =====
    // Requête récupérant les informations principales des catégories
    // (utilisées pour l’affichage des cartes dans le catalogue)
    $stmt = $pdo->query("
        SELECT id, name, slug, image_path, created_at
        FROM categories
        ORDER BY created_at DESC
    ");

    // Récupération de toutes les catégories sous forme de tableau associatif
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Réponse JSON envoyée au front-end (liste des catégories)
    echo json_encode($categories);

} catch (PDOException $e) {

    // Gestion des erreurs serveur liées à la base de données
    http_response_code(500);

    // Réponse JSON standardisée en cas d’erreur API
    echo json_encode([
        "error" => "Erreur serveur",
        "details" => $e->getMessage()
    ]);
}