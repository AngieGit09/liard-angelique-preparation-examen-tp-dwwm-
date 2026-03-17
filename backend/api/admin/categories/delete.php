<?php

// ===== SUPPRESSION D’UNE CATÉGORIE =====
// Supprime une catégorie si elle n’est pas utilisée.
// Supprime également son image associée.

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    $id = $_POST['id'] ?? null;

    // Vérifie la présence de l'id
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID catégorie manquant']);
        exit;
    }

    // ==== VÉRIFICATION DES PRODUITS LIÉS ====
    // Empêche la suppression si la catégorie est utilisée
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

    // ==== RÉCUPÉRATION DE L'IMAGE ====
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

    // ==== SUPPRESSION DU FICHIER IMAGE ====
    if (!empty($category['image_path'])) {

        $filePath = __DIR__ . "/../../../" . $category['image_path'];

        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    // ==== SUPPRESSION EN BASE ====
    $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
    $stmt->execute([$id]);

    // ==== RÉPONSE ====
    echo json_encode([
        'success' => true
    ]);

} catch (PDOException $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}
?>