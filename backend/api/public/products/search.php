<?php
// ========= API PUBLIC - RECHERCHE DE PRODUITS =========
// Endpoint public permettant d’effectuer une recherche dynamique
// de produits par mot-clé (titre, description ou catégorie).
// Utilisé par la page de recherche du front React.

// Format de réponse en JSON (API REST)
header("Content-Type: application/json");

// Autorise l’accès public à l’API (front-end accessible publiquement)
header("Access-Control-Allow-Origin: *");

// Inclusion de la connexion sécurisée à la base de données (PDO)
require_once '../../../config/database.php';

// ==== VERIFICATION DU PARAMETRE DE RECHERCHE ====
// Si aucun terme de recherche n’est fourni, retourne un tableau vide
if (!isset($_GET['q']) || empty(trim($_GET['q']))) {
    echo json_encode([]);
    exit;
}

// ==== NETTOYAGE ET NORMALISATION DE LA RECHERCHE ====
// Conversion en minuscules pour une recherche insensible à la casse
$searchInput = strtolower(trim($_GET['q']));

// Gestion simple du singulier / pluriel pour améliorer la pertinence
// (ex : "meuble" et "meubles")
if (substr($searchInput, -1) === "s") {
    $singular = substr($searchInput, 0, -1);
    $plural = $searchInput;
} else {
    $singular = $searchInput;
    $plural = $searchInput . "s";
}

// Création des patterns SQL avec jokers pour la recherche partielle (LIKE)
$searchSingular = "%" . $singular . "%";
$searchPlural   = "%" . $plural . "%";

try {

    // ===== REQUETE DE RECHERCHE PRODUITS =====
    // Sélection des informations principales du produit
    // + sous-requête pour récupérer UNE image principale
    // (évite les doublons liés à un JOIN sur product_images)
    $stmt = $pdo->prepare("
        SELECT 
            p.id,
            p.title,
            p.price,
            p.description,

            (
                SELECT image_path
                FROM product_images
                WHERE product_id = p.id
                ORDER BY display_order ASC, id ASC
                LIMIT 1
            ) AS image_path

        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id

        WHERE 
            LOWER(p.title) LIKE ?
            OR LOWER(p.description) LIKE ?
            OR LOWER(c.name) LIKE ?
            OR LOWER(p.title) LIKE ?
            OR LOWER(p.description) LIKE ?
            OR LOWER(c.name) LIKE ?

        ORDER BY p.created_at DESC
    ");

    // Exécution de la requête préparée (sécurité contre injections SQL)
    // Double recherche : singulier + pluriel pour améliorer la pertinence
    $stmt->execute([
        $searchSingular,
        $searchSingular,
        $searchSingular,
        $searchPlural,
        $searchPlural,
        $searchPlural
    ]);

    // Récupération de tous les résultats sous forme de tableau associatif
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Réponse JSON envoyée au front-end (liste de produits correspondants)
    echo json_encode($results);

} catch (PDOException $e) {

    // Gestion des erreurs serveur liées à la base de données
    http_response_code(500);

    // Réponse JSON standardisée en cas d’erreur API
    echo json_encode([
        "error" => "Erreur serveur",
        "details" => $e->getMessage()
    ]);
}