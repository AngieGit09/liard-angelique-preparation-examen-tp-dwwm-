<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../../config/database.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "ID manquant"]);
    exit;
}

$id = intval($_GET['id']);

try {

    // Récupération produit
    $stmt = $pdo->prepare("
        SELECT * FROM products WHERE id = ?
    ");
    $stmt->execute([$id]);

    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        http_response_code(404);
        echo json_encode(["error" => "Produit non trouvé"]);
        exit;
    }

    // Récupération images
    $stmtImages = $pdo->prepare("
        SELECT image_path
        FROM product_images
        WHERE product_id = ?
        ORDER BY display_order ASC
    ");
    $stmtImages->execute([$id]);

    $images = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    $product['images'] = $images;

    echo json_encode($product);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur",
        "details" => $e->getMessage()
    ]);
}
