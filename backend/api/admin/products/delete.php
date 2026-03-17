<?php

// ===== SUPPRESSION D’UN PRODUIT =====
// Supprime un produit ainsi que toutes ses images associées (fichiers + base).

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    $id = $_POST['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID produit manquant']);
        exit;
    }

    // ==== RÉCUPÉRATION DES IMAGES ====
    $stmtImages = $pdo->prepare("
        SELECT image_path
        FROM product_images
        WHERE product_id = ?
    ");

    $stmtImages->execute([$id]);
    $images = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    // ==== SUPPRESSION DES FICHIERS ====
    foreach ($images as $img) {

        $filePath = __DIR__ . "/../../../" . $img['image_path'];

        if (!empty($img['image_path']) && file_exists($filePath)) {
            unlink($filePath);
        }
    }

    // ==== SUPPRESSION DU PRODUIT ====
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
?>