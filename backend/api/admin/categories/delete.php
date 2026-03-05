<?php

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    $id = $_POST['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID catégorie manquant']);
        exit;
    }

    // vérifier produits liés
    $checkStmt = $pdo->prepare("
        SELECT COUNT(*) as total
        FROM products
        WHERE category_id = ?
    ");
    $checkStmt->execute([$id]);

    if ($checkStmt->fetch(PDO::FETCH_ASSOC)['total'] > 0) {

        http_response_code(400);

        echo json_encode([
            'error' => 'Catégorie utilisée par des produits'
        ]);

        exit;
    }

    // récupérer image
    $imgStmt = $pdo->prepare("
        SELECT image_path
        FROM categories
        WHERE id = ?
    ");

    $imgStmt->execute([$id]);

    $category = $imgStmt->fetch(PDO::FETCH_ASSOC);

    if (!$category) {
        http_response_code(404);
        echo json_encode(['error' => 'Catégorie introuvable']);
        exit;
    }

    if (!empty($category['image_path'])) {

        $filePath = __DIR__ . "/../../../" . $category['image_path'];

        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        'success' => true
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}