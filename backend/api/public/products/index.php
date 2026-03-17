<?php

// ===== LISTE DES PRODUITS PAR CATÉGORIE =====
// Retourne tous les produits d'une catégorie via son slug.
// Possibilité de récupérer tous les produits avec le slug "all".

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

// Autorise les requêtes
setCorsHeadersPublic();

// Format JSON
header('Content-Type: application/json');

// Vérifie la présence du slug
if (!isset($_GET['slug'])) {
    http_response_code(400);
    echo json_encode(["error" => "Slug manquant"]);
    exit;
}

$slug = $_GET['slug'];

try {

    // ==== CAS : TOUS LES PRODUITS ====
    if ($slug === "all") {

        $stmt = $pdo->query("
            SELECT p.*, pi.image_path
            FROM products p
            LEFT JOIN product_images pi
                ON p.id = pi.product_id
                AND pi.display_order = 1
            ORDER BY p.created_at DESC
        ");

    } else {

        // ==== CAS : FILTRE PAR CATÉGORIE ====
        $stmt = $pdo->prepare("
            SELECT p.*, pi.image_path
            FROM products p
            JOIN categories c ON p.category_id = c.id
            LEFT JOIN product_images pi
                ON p.id = pi.product_id
                AND pi.display_order = 1
            WHERE c.slug = ?
            ORDER BY p.created_at DESC
        ");

        $stmt->execute([$slug]);
    }

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ==== RÉPONSE ====
    echo json_encode($products);

} catch (PDOException $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}
?>