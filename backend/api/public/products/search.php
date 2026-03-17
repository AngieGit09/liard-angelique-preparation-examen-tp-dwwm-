<?php

// ===== RECHERCHE DE PRODUITS =====
// Permet de rechercher des produits via un mot-clé.
// Gère une recherche simple avec singular/plural pour améliorer les résultats.

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

// Autorise les requêtes
setCorsHeadersPublic();

// Format JSON
header('Content-Type: application/json');

// Vérifie que la recherche est présente
if (!isset($_GET['q']) || empty(trim($_GET['q']))) {
    echo json_encode([]);
    exit;
}

// Nettoyage de l'entrée utilisateur
$searchInput = strtolower(trim($_GET['q']));

// ==== GESTION SINGULIER / PLURIEL ====
if (substr($searchInput, -1) === "s") {
    $singular = substr($searchInput, 0, -1);
    $plural = $searchInput;
} else {
    $singular = $searchInput;
    $plural = $searchInput . "s";
}

// Ajout des wildcards pour LIKE
$searchSingular = "%" . $singular . "%";
$searchPlural   = "%" . $plural . "%";

try {

    // ==== REQUÊTE DE RECHERCHE ====
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

    $stmt->execute([
        $searchSingular,
        $searchSingular,
        $searchSingular,
        $searchPlural,
        $searchPlural,
        $searchPlural
    ]);

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ==== RÉPONSE ====
    echo json_encode($results);

} catch (PDOException $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}
?>