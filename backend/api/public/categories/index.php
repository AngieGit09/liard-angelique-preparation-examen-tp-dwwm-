<?php

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

setCorsHeadersPublic();

header('Content-Type: application/json');

try {

    $stmt = $pdo->query("
        SELECT id, name, slug, image_path, created_at
        FROM categories
        ORDER BY created_at DESC
    ");

    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($categories);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}