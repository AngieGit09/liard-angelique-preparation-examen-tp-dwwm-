<?php

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

setCorsHeadersPublic();

header('Content-Type: application/json');

try {

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

    $stmtImages = $pdo->prepare("
        SELECT id, image_path, display_order
        FROM product_images
        WHERE product_id = ?
        ORDER BY display_order ASC, id ASC
    ");

    $stmtImages->execute([$product['id']]);

    $product['images'] = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($product);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}