<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../../config/database.php';

try {

    $stmt = $pdo->query("
        SELECT id, name, slug, image_path 
        FROM categories 
        ORDER BY created_at DESC
    ");

    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($categories);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur",
        "details" => $e->getMessage()
    ]);
}
