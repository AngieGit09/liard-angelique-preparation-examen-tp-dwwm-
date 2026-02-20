<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');

require_once __DIR__ . '/../../../config/database.php';

try {

    // Produit best-seller
    $stmt = $pdo->query("
        SELECT id, title, description, price
        FROM products
        WHERE is_featured = 1
        LIMIT 1
    ");

    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        echo json_encode(null);
        exit;
    }

    // Récupérer TOUTES les images (ordre propre)
    $stmtImages = $pdo->prepare("
        SELECT id, image_path, display_order
        FROM product_images
        WHERE product_id = ?
        ORDER BY display_order ASC, id ASC
    ");
    $stmtImages->execute([$product['id']]);
    $images = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    // Injecter les images dans le produit
    $product['images'] = $images;

    echo json_encode($product);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur",
        "message" => $e->getMessage()
    ]);
}