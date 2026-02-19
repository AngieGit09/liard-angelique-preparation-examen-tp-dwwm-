<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ===== CORS =====
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json');

// Preflight CORS
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
    $id = $_POST['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID produit manquant']);
        exit;
    }

    // RÉCUPÉRER TOUTES LES IMAGES AVANT SUPPRESSION (TRÈS IMPORTANT)
    $stmtImages = $pdo->prepare("
        SELECT image_path 
        FROM product_images 
        WHERE product_id = ?
    ");
    $stmtImages->execute([$id]);
    $images = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    // SUPPRIMER LES FICHIERS PHYSIQUES DU DOSSIER
    $baseUploadPath = __DIR__ . "/../../../";

    foreach ($images as $img) {
        $filePath = $baseUploadPath . $img['image_path'];

        if (!empty($img['image_path']) && file_exists($filePath)) {
            unlink($filePath);
        }
    }

    // SUPPRIMER LE PRODUIT (CASCADE supprimera product_images)
    $stmtDelete = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmtDelete->execute([$id]);

    echo json_encode([
        'success' => true,
        'message' => 'Produit et images supprimés définitivement'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}
