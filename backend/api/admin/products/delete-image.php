<?php

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    $imageId = $_POST['image_id'] ?? null;

    if (!$imageId) {
        http_response_code(400);
        echo json_encode(['error' => 'ID image manquant']);
        exit;
    }

    $stmt = $pdo->prepare("
        SELECT id, product_id, image_path
        FROM product_images
        WHERE id = ?
    ");

    $stmt->execute([$imageId]);
    $image = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$image) {
        http_response_code(404);
        echo json_encode(['error' => 'Image introuvable']);
        exit;
    }

    $productId = $image['product_id'];

    $countStmt = $pdo->prepare("
        SELECT COUNT(*) as total
        FROM product_images
        WHERE product_id = ?
    ");

    $countStmt->execute([$productId]);
    $result = $countStmt->fetch(PDO::FETCH_ASSOC);

    if ($result['total'] <= 1) {

        http_response_code(400);

        echo json_encode([
            'error' => 'Impossible de supprimer la dernière image du produit'
        ]);

        exit;
    }

    $filePath = __DIR__ . "/../../../" . $image['image_path'];

    if (file_exists($filePath)) {
        unlink($filePath);
    }

    $deleteStmt = $pdo->prepare("DELETE FROM product_images WHERE id = ?");
    $deleteStmt->execute([$imageId]);

    echo json_encode([
        'success' => true
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'error' => 'Erreur serveur'
    ]);
}