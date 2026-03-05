<?php

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

setCorsHeadersPublic();

header('Content-Type: application/json');

if (!isset($_GET['q']) || empty(trim($_GET['q']))) {
    echo json_encode([]);
    exit;
}

$searchInput = strtolower(trim($_GET['q']));

if (substr($searchInput, -1) === "s") {
    $singular = substr($searchInput, 0, -1);
    $plural = $searchInput;
} else {
    $singular = $searchInput;
    $plural = $searchInput . "s";
}

$searchSingular = "%" . $singular . "%";
$searchPlural   = "%" . $plural . "%";

try {

    $stmt = $pdo->prepare("
        SELECT 
            p.id,
            p.title,
            p.price,
            p.description,

            (
                SELECT image_path
                FROM product_images
                WHERE product_id = p.id
                ORDER BY display_order ASC, id ASC
                LIMIT 1
            ) AS image_path

        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id

        WHERE 
            LOWER(p.title) LIKE ?
            OR LOWER(p.description) LIKE ?
            OR LOWER(c.name) LIKE ?
            OR LOWER(p.title) LIKE ?
            OR LOWER(p.description) LIKE ?
            OR LOWER(c.name) LIKE ?

        ORDER BY p.created_at DESC
    ");

    $stmt->execute([
        $searchSingular,
        $searchSingular,
        $searchSingular,
        $searchPlural,
        $searchPlural,
        $searchPlural
    ]);

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}