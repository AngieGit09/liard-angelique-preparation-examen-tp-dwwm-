<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../../config/database.php';

try {

    $stmt = $pdo->prepare("
        SELECT p.*, pi.image_path
        FROM products p
        LEFT JOIN product_images pi 
            ON p.id = pi.product_id 
            AND pi.display_order = 1
        WHERE p.is_featured = 1
        LIMIT 1
    ");

    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        http_response_code(404);
        echo json_encode(["message" => "Aucun produit coup de cœur trouvé"]);
        exit;
    }

    echo json_encode($product);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur",
        "details" => $e->getMessage()
    ]);
}