<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ===== CORS =====
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json');

// Preflight
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
    $imageId = $_POST['image_id'] ?? null;

    if (!$imageId) {
        http_response_code(400);
        echo json_encode(['error' => 'ID image manquant']);
        exit;
    }

    // Récupérer l'image + le produit associé
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

    // Vérifier combien d’images possède le produit
    $countStmt = $pdo->prepare("
        SELECT COUNT(*) as total 
        FROM product_images 
        WHERE product_id = ?
    ");
    $countStmt->execute([$productId]);
    $result = $countStmt->fetch(PDO::FETCH_ASSOC);

    if ($result['total'] <= 1) {
        // Bloquer la suppression de la dernière image
        http_response_code(400);
        echo json_encode([
            'error' => 'Impossible de supprimer la dernière image du produit.'
        ]);
        exit;
    }

    // Supprimer le fichier physique
    $basePath = __DIR__ . "/../../../";
    $filePath = $basePath . $image['image_path'];

    if (file_exists($filePath)) {
        unlink($filePath);
    }

    // Supprimer l’image en base
    $deleteStmt = $pdo->prepare("DELETE FROM product_images WHERE id = ?");
    $deleteStmt->execute([$imageId]);

    echo json_encode([
        'success' => true,
        'message' => 'Image supprimée avec succès'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}
