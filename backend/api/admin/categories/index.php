<?php

// ===== LISTE DES CATÉGORIES (ADMIN) =====
// Récupère toutes les catégories pour l’interface admin.
// Utilisé pour affichage, sélection ou gestion.

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    // ==== RÉCUPÉRATION DES CATÉGORIES ====
    $stmt = $pdo->query("
        SELECT id, name, image_path
        FROM categories
        ORDER BY name ASC
    ");

    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ==== RÉPONSE ====
    echo json_encode($categories);

} catch (PDOException $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur",
        "message" => $e->getMessage()
    ]);
}
?>