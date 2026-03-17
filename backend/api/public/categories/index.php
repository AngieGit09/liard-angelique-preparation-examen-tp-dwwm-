<?php

// ===== LISTE DES CATÉGORIES =====
// Récupère toutes les catégories disponibles.
// Utilisé pour afficher les sections du site (menu, filtres, etc.).

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

// Autorise les requêtes
setCorsHeadersPublic();

// Format JSON
header('Content-Type: application/json');

try {

    // ==== RÉCUPÉRATION DES CATÉGORIES ====
    $stmt = $pdo->query("
        SELECT id, name, slug, image_path, created_at
        FROM categories
        ORDER BY created_at DESC
    ");

    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ==== RÉPONSE ====
    echo json_encode($categories);

} catch (PDOException $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}
?>