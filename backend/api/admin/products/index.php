<?php
// ========= API ADMIN - LISTE DES PRODUITS =========
// Cette API permet de récupérer tous les produits (avec leurs images)
// pour l'affichage dans le back-office (page gestion des produits).

// Activation de l'affichage des erreurs (utile en développement)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ===== HEADERS CORS & FORMAT =====
// Autorise les requêtes depuis le front React en local
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l'envoi des cookies de session (auth admin)
header('Access-Control-Allow-Credentials: true');

// Autorise l'envoi du header Content-Type
header('Access-Control-Allow-Headers: Content-Type');

// Méthodes HTTP autorisées pour cette API
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

// Format de réponse : JSON (API REST)
header('Content-Type: application/json');

// ===== GESTION PREFLIGHT (REQUETE OPTIONS) =====
// Réponse immédiate pour les requêtes CORS du navigateur
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Démarrage de la session PHP (authentification admin)
session_start();

// ===== SECURITE : VERIFICATION SESSION ADMIN =====
// Empêche l'accès à l'API si l'utilisateur n'est pas connecté en admin
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401); // Non autorisé
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}

// Connexion à la base de données via PDO
require_once __DIR__ . '/../../../config/database.php';

try {

    // ===== RECUPERATION DE TOUS LES PRODUITS =====
    // On récupère les informations principales nécessaires au back-office :
    // - id : identifiant du produit
    // - title : nom du produit
    // - price : prix
    // - description : description courte
    // - story : histoire du meuble (utilisée dans la modale d'édition)
    // - category_id : catégorie associée
    // - is_featured : statut best-seller
    // - created_at : date de création (tri et affichage)
    $stmt = $pdo->query("
        SELECT 
            p.id,
            p.title,
            p.price,
            p.description,
            p.story, -- IMPORTANT : utilisé dans la modale d'édition produit
            p.category_id,
            p.is_featured,
            p.created_at
        FROM products p
        ORDER BY p.id DESC
    ");

    // Récupération de tous les produits sous forme de tableau associatif
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ===== RECUPERATION DES IMAGES POUR CHAQUE PRODUIT =====
    // On parcourt chaque produit pour lui associer ses images
    foreach ($products as &$product) {

        // Requête préparée pour récupérer les images du produit courant
        // Tri par ordre d'affichage puis par ID (ordre stable)
        $stmtImages = $pdo->prepare("
            SELECT id, image_path, display_order
            FROM product_images
            WHERE product_id = ?
            ORDER BY display_order ASC, id ASC
        ");
        $stmtImages->execute([$product['id']]);

        // Toutes les images du produit
        $images = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

        // Ajout du tableau d'images dans l'objet produit (utile pour la modale)
        $product['images'] = $images;

        // Image principale (la première) pour l'affichage dans la carte admin
        $product['image'] = $images[0]['image_path'] ?? null;

        // Nombre total de photos (affiché dans la carte de gestion)
        $product['photosCount'] = count($images);
    }

    // Retour JSON de la liste complète des produits enrichis (avec images)
    echo json_encode($products);

} catch (PDOException $e) {

    // ===== GESTION DES ERREURS SERVEUR =====
    // En cas d'erreur base de données, on renvoie une erreur 500
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}