<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../../../config/database.php';

if (!isset($_GET['slug'])) {
    http_response_code(400);
    echo json_encode(["error" => "Slug manquant"]);
    exit;
}

$slug = $_GET['slug'];

try {

    // Cas spécial : toutes les catégories
    if ($slug === "all") {

        $stmt = $pdo->prepare("
            SELECT p.*, pi.image_path
            FROM products p
            LEFT JOIN product_images pi 
                ON p.id = pi.product_id 
                AND pi.display_order = 1
            ORDER BY p.created_at DESC
        ");  $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    } else {

        // Produits d'une catégorie spécifique
        $stmt = $pdo->prepare("
            SELECT p.*, pi.image_path
            FROM products p
            JOIN categories c ON p.category_id = c.id
            LEFT JOIN product_images pi 
                ON p.id = pi.product_id 
                AND pi.display_order = 1
            WHERE c.slug = :slug
            ORDER BY p.created_at DESC
        ");

        $stmt->execute(['slug' => $slug]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode($products);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur",
        "details" => $e->getMessage()
    ]);
}