<?php

// ===== SUPPRESSION D’UNE IMAGE =====
// Supprime une image spécifique d’un produit.
// Empêche la suppression si c’est la dernière image.

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    $imageId = $_POST['image_id'] ?? null;

    if (!$imageId) {
        http_response_code(400);
        echo json_encode(['error' => 'ID image manquant']);
        exit;
    }

    // ==== RÉCUPÉRATION DE L'IMAGE ====
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

    // ==== VÉRIFICATION DU NOMBRE D’IMAGES ====
    $countStmt = $pdo->prepare("
        SELECT COUNT(*) as total
        FROM product_images
        WHERE product_id = ?
    ");

    $countStmt->execute([$productId]);
    $result = $countStmt->fetch(PDO::FETCH_ASSOC);

    // Empêche de supprimer la dernière image
    if ($result['total'] <= 1) {

        http_response_code(400);

        echo json_encode([
            'error' => 'Impossible de supprimer la dernière image du produit'
        ]);

        exit;
    }

    // ==== SUPPRESSION DU FICHIER ====
    $filePath = __DIR__ . "/../../../" . $image['image_path'];

    if (file_exists($filePath)) {
        unlink($filePath);
    }

    // ==== SUPPRESSION EN BASE ====
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
?>