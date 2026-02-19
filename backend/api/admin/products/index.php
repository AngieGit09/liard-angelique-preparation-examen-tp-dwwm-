<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ===== CORS =====
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');

// Répondre au preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ===== SESSION =====
session_start();

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}

// ===== DATABASE =====
require_once '../../../config/database.php';

try {

    $stmt = $pdo->query("
        SELECT 
            p.id,
            p.title,
            p.price,
            p.description,
            p.category_id,
            p.is_featured,
            p.created_at,

            (
                SELECT image_path
                FROM product_images
                WHERE product_id = p.id
                ORDER BY display_order ASC
                LIMIT 1
            ) AS image,

            (
                SELECT COUNT(*)
                FROM product_images
                WHERE product_id = p.id
            ) AS photosCount

        FROM products p
        ORDER BY p.id DESC
    ");

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($products);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}
