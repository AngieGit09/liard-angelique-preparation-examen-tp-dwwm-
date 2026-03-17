<?php

// ===== RÉCUPÉRATION D'UN PRODUIT =====
// Retourne les informations complètes d’un produit via son ID.
// Inclut également toutes les images associées.

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

// Autorise les requêtes front
setCorsHeadersPublic();

// Format JSON
header('Content-Type: application/json');

// Vérifie la présence de l'id dans l'URL
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "ID manquant"]);
    exit;
}

// Conversion sécurisée en entier
$id = intval($_GET['id']);

try {

    // ==== RÉCUPÉRATION DU PRODUIT ====
    $stmt = $pdo->prepare("
        SELECT *
        FROM products
        WHERE id = ?
    ");

    $stmt->execute([$id]);

    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    // Produit non trouvé
    if (!$product) {
        http_response_code(404);
        echo json_encode(["error" => "Produit non trouvé"]);
        exit;
    }

    // ==== RÉCUPÉRATION DES IMAGES ====
    $stmtImages = $pdo->prepare("
        SELECT image_path
        FROM product_images
        WHERE product_id = ?
        ORDER BY display_order ASC
    ");

    $stmtImages->execute([$id]);

    // Ajoute les images au produit
    $product['images'] = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    // ==== RÉPONSE ====
    echo json_encode($product);

} catch (PDOException $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}
?>