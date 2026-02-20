<?php
// ========= API PUBLIC - LISTE DES PRODUITS PAR CATEGORIE =========
// Endpoint public permettant de récupérer les produits
// en fonction d’un slug de catégorie (ou tous les produits).
// Utilisé par la page Catalogue et les pages Catégories du front React.

// Format de réponse en JSON (API REST)
header("Content-Type: application/json");

// Autorise l’accès public à l’API (front accessible sans authentification)
header("Access-Control-Allow-Origin: *");

// Inclusion de la connexion à la base de données via PDO sécurisé
require_once '../../../config/database.php';

// Vérification de la présence du paramètre "slug" dans l’URL
if (!isset($_GET['slug'])) {
    // Code HTTP 400 : paramètre requis manquant
    http_response_code(400);
    echo json_encode(["error" => "Slug manquant"]);
    exit;
}

// Récupération du slug de catégorie envoyé par le front-end
$slug = $_GET['slug'];

try {

    // ===== CAS SPECIAL : RECUPERATION DE TOUS LES PRODUITS =====
    // Si le slug est "all", on retourne l’ensemble du catalogue
    if ($slug === "all") {

        // Requête récupérant tous les produits
        // + image principale (display_order = 1)
        $stmt = $pdo->prepare("
            SELECT p.*, pi.image_path
            FROM products p
            LEFT JOIN product_images pi 
                ON p.id = pi.product_id 
                AND pi.display_order = 1
            ORDER BY p.created_at DESC
        ");
        $stmt->execute();

        // Récupération des produits sous forme de tableau associatif
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    } else {

        // ===== CAS STANDARD : PRODUITS D'UNE CATEGORIE SPECIFIQUE =====
        // Jointure avec la table categories pour filtrer par slug
        $stmt = $pdo->prepare("
            SELECT p.*, pi.image_path
            FROM products p
            JOIN categories c ON p.category_id = c.id
            LEFT JOIN product_images pi 
                ON p.id = pi.product_id 
                AND pi.display_order = 1
            WHERE c.slug = :slug
            ORDER BY p.created_at DESC
        ");

        // Exécution de la requête préparée (sécurisée contre injections SQL)
        $stmt->execute(['slug' => $slug]);

        // Liste des produits appartenant à la catégorie demandée
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Réponse JSON envoyée au front-end (React)
    echo json_encode($products);

} catch (PDOException $e) {

    // Gestion des erreurs serveur liées à la base de données
    http_response_code(500);

    // Réponse JSON standardisée en cas d’erreur API
    echo json_encode([
        "error" => "Erreur serveur",
        "details" => $e->getMessage()
    ]);
}