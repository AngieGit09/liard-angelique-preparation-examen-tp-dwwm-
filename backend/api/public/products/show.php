<?php

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

setCorsHeadersPublic();

header('Content-Type: application/json');

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "ID manquant"]);
    exit;
}

$id = intval($_GET['id']);

try {

    $stmt = $pdo->prepare("
        SELECT *
        FROM products
        WHERE id = ?
    ");

    $stmt->execute([$id]);

    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        http_response_code(404);
        echo json_encode(["error" => "Produit non trouvé"]);
        exit;
    }

    $stmtImages = $pdo->prepare("
        SELECT image_path
        FROM product_images
        WHERE product_id = ?
        ORDER BY display_order ASC
    ");

    $stmtImages->execute([$id]);

    $product['images'] = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($product);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}