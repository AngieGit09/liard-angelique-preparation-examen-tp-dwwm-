<?php
// ========= API ADMIN - SUPPRESSION D'UNE CATEGORIE =========
// Endpoint sécurisé permettant de supprimer une catégorie.
// Inclut plusieurs règles métier :
// - Vérification admin connecté
// - Blocage si la catégorie est utilisée par des produits
// - Suppression de l’image physique associée
// - Suppression en base de données


// ===== DEBUG (ENVIRONNEMENT DE DEVELOPPEMENT) =====
// Active l'affichage des erreurs pour faciliter le débogage en local
ini_set('display_errors', 1);
error_reporting(E_ALL);


// ===== HEADERS CORS & FORMAT =====
// Autorise les requêtes depuis l'application front (React)
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l'utilisation des cookies de session (authentification admin)
header('Access-Control-Allow-Credentials: true');

// Autorise les headers nécessaires aux requêtes POST JSON / FormData
header('Access-Control-Allow-Headers: Content-Type');

// Méthodes HTTP autorisées pour cet endpoint
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Format de réponse de l’API
header('Content-Type: application/json');


// ===== GESTION PREFLIGHT (CORS) =====
// Réponse automatique aux requêtes OPTIONS du navigateur
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


// ===== SESSION ADMIN =====
session_start();

// Sécurisation de l’endpoint : accès réservé aux administrateurs connectés
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}


// ===== CONNEXION BASE DE DONNEES =====
require_once '../../../config/database.php';

try {
    // ===== RECUPERATION DE L’ID CATEGORIE =====
    $id = $_POST['id'] ?? null;

    // Validation du paramètre obligatoire
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID catégorie manquant']);
        exit;
    }

    // ===== REGLE METIER : CATEGORIE UTILISEE PAR DES PRODUITS =====
    // Empêche la suppression si des produits sont encore liés à cette catégorie
    $checkStmt = $pdo->prepare("
        SELECT COUNT(*) as total 
        FROM products 
        WHERE category_id = ?
    ");
    $checkStmt->execute([$id]);
    $result = $checkStmt->fetch(PDO::FETCH_ASSOC);

    // Blocage logique pour préserver l'intégrité des données
    if ($result['total'] > 0) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Impossible de supprimer cette catégorie : elle est utilisée par des produits.'
        ]);
        exit;
    }

    // ===== RECUPERATION DE L’IMAGE DE LA CATEGORIE =====
    // Permet de supprimer également le fichier physique côté serveur
    $imgStmt = $pdo->prepare("
        SELECT image_path 
        FROM categories 
        WHERE id = ?
    ");
    $imgStmt->execute([$id]);
    $category = $imgStmt->fetch(PDO::FETCH_ASSOC);

    // Vérifie que la catégorie existe en base
    if (!$category) {
        http_response_code(404);
        echo json_encode(['error' => 'Catégorie introuvable']);
        exit;
    }

    // ===== SUPPRESSION DE L’IMAGE PHYSIQUE =====
    // Nettoyage du fichier dans le dossier uploads pour éviter les fichiers orphelins
    if (!empty($category['image_path'])) {
        $basePath = __DIR__ . "/../../../";
        $filePath = $basePath . $category['image_path'];

        // Vérification de l’existence du fichier avant suppression
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    // ===== SUPPRESSION DE LA CATEGORIE EN BASE =====
    // Suppression définitive de l’enregistrement
    $deleteStmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
    $deleteStmt->execute([$id]);

    // Réponse de succès envoyée au front admin
    echo json_encode([
        'success' => true,
        'message' => 'Catégorie supprimée avec succès'
    ]);

} catch (PDOException $e) {
    // Gestion des erreurs serveur liées à la base de données
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}
