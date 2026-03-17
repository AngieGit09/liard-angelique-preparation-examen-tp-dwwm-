<?php

// ===== LISTE PRODUITS (ADMIN) =====
// Retourne tous les produits avec leurs images.
// Ajoute des infos utiles : image principale + nombre d’images.

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    // ==== RÉCUPÉRATION DES PRODUITS ====
    $stmt = $pdo->query("
        SELECT
            p.id,
            p.title,
            p.price,
            p.description,
            p.story,
            p.category_id,
            p.is_featured,
            p.created_at
        FROM products p
        ORDER BY p.id DESC
    ");

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ==== AJOUT DES IMAGES ====
    foreach ($products as &$product) {

        $stmtImages = $pdo->prepare("
            SELECT id, image_path, display_order
            FROM product_images
            WHERE product_id = ?
            ORDER BY display_order ASC, id ASC
        ");

        $stmtImages->execute([$product['id']]);

        $images = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

        $product['images'] = $images;

        // Image principale (première)
        $product['image'] = $images[0]['image_path'] ?? null;

        // Nombre total d’images
        $product['photosCount'] = count($images);
    }

    echo json_encode($products);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'error' => 'Erreur serveur'
    ]);
}
?>