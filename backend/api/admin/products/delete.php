<?php

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    $id = $_POST['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID produit manquant']);
        exit;
    }

    $stmtImages = $pdo->prepare("
        SELECT image_path
        FROM product_images
        WHERE product_id = ?
    ");

    $stmtImages->execute([$id]);
    $images = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    foreach ($images as $img) {

        $filePath = __DIR__ . "/../../../" . $img['image_path'];

        if (!empty($img['image_path']) && file_exists($filePath)) {
            unlink($filePath);
        }
    }

    $stmtDelete = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmtDelete->execute([$id]);

    echo json_encode([
        'success' => true
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'error' => 'Erreur serveur'
    ]);
}