<?php
// ========= API ADMIN - SUPPRESSION D'UN PRODUIT =========
// Endpoint sécurisé permettant de supprimer un produit
// ainsi que toutes ses images associées (base de données + fichiers serveur).
// Utilisé par la modale de confirmation dans le back-office.


// ===== DEBUG (ENVIRONNEMENT DEVELOPPEMENT) =====
ini_set('display_errors', 1);
error_reporting(E_ALL);


// ===== CORS =====
// Autorise les requêtes depuis le front React (admin)
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l'envoi des cookies de session (authentification admin)
header('Access-Control-Allow-Credentials: true');

// Autorise le header Content-Type
header('Access-Control-Allow-Headers: Content-Type');

// Méthodes autorisées
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

// Sécurisation : empêche l’accès si l’admin n’est pas connecté
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401); // Non autorisé
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}


// ===== CONNEXION BASE DE DONNEES =====
require_once '../../../config/database.php';

try {

    // ===== RECUPERATION ID PRODUIT =====
    $id = $_POST['id'] ?? null;

    if (!$id) {
        http_response_code(400); // Mauvaise requête
        echo json_encode(['error' => 'ID produit manquant']);
        exit;
    }

    // ===== RECUPERATION DES IMAGES AVANT SUPPRESSION =====
    // IMPORTANT : on récupère les chemins des images
    // pour pouvoir supprimer les fichiers physiques du serveur
    $stmtImages = $pdo->prepare("
        SELECT image_path 
        FROM product_images 
        WHERE product_id = ?
    ");
    $stmtImages->execute([$id]);
    $images = $stmtImages->fetchAll(PDO::FETCH_ASSOC);

    // ===== SUPPRESSION DES FICHIERS SUR LE SERVEUR =====
    // Chemin racine du dossier uploads
    $baseUploadPath = __DIR__ . "/../../../";

    foreach ($images as $img) {

        $filePath = $baseUploadPath . $img['image_path'];

        // Vérifie que le fichier existe avant suppression
        if (!empty($img['image_path']) && file_exists($filePath)) {
            unlink($filePath); // Suppression physique du fichier
        }
    }

    // ===== SUPPRESSION DU PRODUIT EN BASE =====
    // Si la base est configurée avec ON DELETE CASCADE,
    // les enregistrements liés dans product_images seront supprimés automatiquement
    $stmtDelete = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmtDelete->execute([$id]);

    // Réponse de succès
    echo json_encode([
        'success' => true,
        'message' => 'Produit et images supprimés définitivement'
    ]);

} catch (PDOException $e) {

    // Gestion des erreurs serveur
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}