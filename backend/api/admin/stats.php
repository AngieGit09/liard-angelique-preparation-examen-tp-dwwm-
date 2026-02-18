<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

session_start();

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}

require_once '../../config/database.php';

try {

    // Nombre total produits
    $stmt = $pdo->query("SELECT COUNT(*) AS total FROM products");
    $totalProducts = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Dernier produit (si pas de created_at → utiliser id)
   $stmt = $pdo->query("SELECT title FROM products ORDER BY id DESC LIMIT 1");

    $lastProduct = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'totalProducts' => (int) $totalProducts,
        'lastProduct' => $lastProduct ? $lastProduct['title'] : null

    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}
