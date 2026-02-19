<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../../../config/database.php";

try {
    $id = $_POST['id'] ?? 0;
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $price = $_POST['price'] ?? 0;
    $category_id = $_POST['category_id'] ?? 0;
    $is_featured = isset($_POST['is_featured']) ? (int)$_POST['is_featured'] : 0;

    if (empty($id) || empty($title) || empty($description) || empty($price) || empty($category_id)) {
        http_response_code(400);
        echo json_encode(["error" => "Champs obligatoires manquants"]);
        exit;
    }

    
    // Si on met ce produit en best-seller → on retire l'ancien
    if ($is_featured === 1) {
        $pdo->query("UPDATE products SET is_featured = 0");
    }

    // Mise à jour du produit (autorise aussi is_featured = 0)
    $stmt = $pdo->prepare("
        UPDATE products
        SET title = ?, description = ?, price = ?, category_id = ?, is_featured = ?
        WHERE id = ?
    ");

    $stmt->execute([
        $title,
        $description,
        $price,
        $category_id,
        $is_featured,
        $id
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Produit mis à jour avec succès"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur : " . $e->getMessage()
    ]);
}
