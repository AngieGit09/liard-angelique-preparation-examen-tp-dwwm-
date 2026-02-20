<?php
// ========= API ADMIN - SUPPRESSION D'UNE IMAGE PRODUIT =========
// Endpoint sécurisé permettant de supprimer une image spécifique d’un produit.
// Implémente une règle métier : un produit doit toujours avoir au moins une image.


// ===== DEBUG (ENVIRONNEMENT DEVELOPPEMENT) =====
ini_set('display_errors', 1);
error_reporting(E_ALL);


// ===== CORS =====
// Autorise les requêtes depuis le front admin (React)
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l'envoi des cookies de session (auth admin)
header('Access-Control-Allow-Credentials: true');

// Autorise l’envoi du header Content-Type
header('Access-Control-Allow-Headers: Content-Type');

// Méthodes HTTP autorisées
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Format de réponse JSON
header('Content-Type: application/json');


// ===== PREFLIGHT CORS =====
// Réponse immédiate pour les requêtes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


// ===== SESSION ADMIN =====
session_start();

// Vérifie que l'utilisateur est bien connecté en tant qu'administrateur
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401); // Non autorisé
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}


// ===== CONNEXION BASE DE DONNEES =====
require_once '../../../config/database.php';

try {

    // ===== RECUPERATION DE L’ID IMAGE =====
    $imageId = $_POST['image_id'] ?? null;

    if (!$imageId) {
        http_response_code(400); // Mauvaise requête
        echo json_encode(['error' => 'ID image manquant']);
        exit;
    }

    // ===== RECUPERATION DES INFORMATIONS DE L’IMAGE =====
    // Permet de connaître le produit associé et le chemin du fichier
    $stmt = $pdo->prepare("
        SELECT id, product_id, image_path 
        FROM product_images 
        WHERE id = ?
    ");
    $stmt->execute([$imageId]);
    $image = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérifie que l’image existe
    if (!$image) {
        http_response_code(404); // Ressource introuvable
        echo json_encode(['error' => 'Image introuvable']);
        exit;
    }

    $productId = $image['product_id'];

    // ===== REGLE METIER : AU MOINS UNE IMAGE PAR PRODUIT =====
    // On vérifie combien d’images possède le produit
    $countStmt = $pdo->prepare("
        SELECT COUNT(*) as total 
        FROM product_images 
        WHERE product_id = ?
    ");
    $countStmt->execute([$productId]);
    $result = $countStmt->fetch(PDO::FETCH_ASSOC);

    // Empêche la suppression si c’est la dernière image
    if ($result['total'] <= 1) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Impossible de supprimer la dernière image du produit.'
        ]);
        exit;
    }

    // ===== SUPPRESSION DU FICHIER PHYSIQUE =====
    // Chemin racine du projet
    $basePath = __DIR__ . "/../../../";
    $filePath = $basePath . $image['image_path'];

    // Vérifie que le fichier existe avant suppression
    if (file_exists($filePath)) {
        unlink($filePath); // Suppression physique sur le serveur
    }

    // ===== SUPPRESSION EN BASE DE DONNEES =====
    $deleteStmt = $pdo->prepare("DELETE FROM product_images WHERE id = ?");
    $deleteStmt->execute([$imageId]);

    // Réponse de succès
    echo json_encode([
        'success' => true,
        'message' => 'Image supprimée avec succès'
    ]);

} catch (PDOException $e) {

    // Gestion des erreurs serveur
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}