<?php

// ===== PRODUIT MIS EN AVANT =====
// Récupère un produit "featured" (mis en avant).
// Inclut toutes les images associées pour affichage (ex: page d'accueil).

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

// Autorise les requêtes
setCorsHeadersPublic();

// Format JSON
header('Content-Type: application/json');

try {

    // ==== RÉCUPÉRATION DU PRODUIT FEATURED ====
    $stmt = $pdo->query("
        SELECT id, title, description, price
        FROM products
        WHERE is_featured = 1
        LIMIT 1
    ");

    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    // Aucun produit mis en avant
    if (!$product) {
        echo json_encode(null);
        exit;
    }

    // ==== RÉCUPÉRATION DES IMAGES ====
    $stmtImages = $pdo->prepare("
        SELECT id, image_path, display_order
        FROM product_images
        WHERE product_id = ?
        ORDER BY display_order ASC, id ASC
    ");

    $stmtImages->execute([$product['id']]);

    $product['images'] = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    // ==== RÉPONSE ====
    echo json_encode($product);

} catch (PDOException $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}
?>