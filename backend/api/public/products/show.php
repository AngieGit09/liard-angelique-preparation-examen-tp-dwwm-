<?php
// ========= API PUBLIC - RECUPERATION D'UN PRODUIT (SHOW) =========
// Endpoint public permettant de récupérer le détail d’un produit
// ainsi que ses images associées pour la page fiche produit.

// Format de réponse en JSON (API REST)
header("Content-Type: application/json");

// Autorise l’accès à l’API depuis n’importe quelle origine (front public)
header("Access-Control-Allow-Origin: *");

// Inclusion de la connexion sécurisée à la base de données (PDO)
require_once '../../../config/database.php';

// Vérification de la présence du paramètre ID dans l’URL
if (!isset($_GET['id'])) {
    // Code HTTP 400 : requête invalide
    http_response_code(400);
    echo json_encode(["error" => "ID manquant"]);
    exit;
}

// Sécurisation et conversion de l’ID en entier
$id = intval($_GET['id']);

try {

    // ===== RECUPERATION DU PRODUIT =====
    // Requête préparée pour récupérer les informations du produit
    $stmt = $pdo->prepare("
        SELECT * FROM products WHERE id = ?
    ");
    $stmt->execute([$id]);

    // Récupération du produit sous forme de tableau associatif
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérification de l’existence du produit
    if (!$product) {
        // Code HTTP 404 : ressource non trouvée
        http_response_code(404);
        echo json_encode(["error" => "Produit non trouvé"]);
        exit;
    }

    // ===== RECUPERATION DES IMAGES ASSOCIEES =====
    // Récupération des images liées au produit (galerie)
    $stmtImages = $pdo->prepare("
        SELECT image_path
        FROM product_images
        WHERE product_id = ?
        ORDER BY display_order ASC
    ");
    $stmtImages->execute([$id]);

    // Récupération de toutes les images du produit
    $images = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    // Ajout des images dans la réponse produit (structure JSON enrichie)
    $product['images'] = $images;

    // Réponse JSON finale envoyée au front-end (React)
    echo json_encode($product);

} catch (PDOException $e) {

    // Gestion des erreurs serveur liées à la base de données
    // Code HTTP 500 : erreur interne du serveur
    http_response_code(500);

    // Réponse JSON standardisée pour le front
    echo json_encode([
        "error" => "Erreur serveur",
        "details" => $e->getMessage()
    ]);
}