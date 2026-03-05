<?php

require_once __DIR__ . '/../../middleware/adminAuth.php';
require_once __DIR__ . '/../../config/database.php';

try {

    $stmt = $pdo->query("SELECT COUNT(*) AS total FROM products");
    $totalProducts = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    $stmt = $pdo->query("SELECT title FROM products ORDER BY id DESC LIMIT 1");
    $lastProduct = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'totalProducts' => (int)$totalProducts,
        'lastProduct' => $lastProduct['title'] ?? null
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'error' => 'Erreur serveur'
    ]);
}