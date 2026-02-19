<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../../../config/database.php';

// ==== Vérification paramètre ====

if (!isset($_GET['q']) || empty(trim($_GET['q']))) {
    echo json_encode([]);
    exit;
}

// ==== Nettoyage recherche ====

$searchInput = strtolower(trim($_GET['q']));

// Gestion singulier / pluriel simple
if (substr($searchInput, -1) === "s") {
    $singular = substr($searchInput, 0, -1);
    $plural = $searchInput;
} else {
    $singular = $searchInput;
    $plural = $searchInput . "s";
}

// Patterns SQL
$searchSingular = "%" . $singular . "%";
$searchPlural   = "%" . $plural . "%";

try {

    $stmt = $pdo->prepare("
        SELECT DISTINCT p.*, pi.image_path
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images pi 
            ON p.id = pi.product_id 
            AND pi.display_order = 1
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
        "error" => "Erreur serveur",
        "details" => $e->getMessage()
    ]);
}
