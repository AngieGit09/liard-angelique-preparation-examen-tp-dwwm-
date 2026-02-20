<?php
// ========= API ADMIN - AJOUT D'UNE CATEGORIE =========
// Endpoint sécurisé permettant à un administrateur
// d'ajouter une nouvelle catégorie avec image.
// Inclut : génération automatique du slug + upload image + vérification unicité.


// ===== DEBUG (ENVIRONNEMENT DEVELOPPEMENT) =====
ini_set('display_errors', 1);
error_reporting(E_ALL);


// ===== CORS =====
// Autorise les requêtes depuis le front admin (React)
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l’envoi des cookies (session PHP)
header('Access-Control-Allow-Credentials: true');

// Autorise les headers nécessaires
header('Access-Control-Allow-Headers: Content-Type');

// Méthodes autorisées
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Format JSON
header('Content-Type: application/json');


// ===== PREFLIGHT CORS =====
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


// ===== SESSION ADMIN =====
session_start();

// Sécurisation : accès réservé aux administrateurs connectés
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}


// ===== CONNEXION BASE DE DONNEES =====
require_once '../../../config/database.php';

try {

    // ===== VALIDATION NOM =====
    $name = trim($_POST['name'] ?? '');

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['error' => 'Le nom de la catégorie est requis']);
        exit;
    }

    // ===== VALIDATION IMAGE =====
    // Vérifie qu’un fichier image est bien envoyé
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Une image est requise']);
        exit;
    }

    // ===== GENERATION AUTOMATIQUE DU SLUG =====
    // Transformation du nom en URL-friendly
    $slug = strtolower($name);

    // Supprime les accents (é → e)
    $slug = iconv('UTF-8', 'ASCII//TRANSLIT', $slug);

    // Remplace tout caractère non alphanumérique par un tiret
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);

    // Supprime les tirets en début et fin
    $slug = trim($slug, '-');

    // ===== VERIFICATION UNICITE SLUG =====
    // Empêche la création de deux catégories avec la même URL
    $checkStmt = $pdo->prepare("SELECT id FROM categories WHERE slug = ?");
    $checkStmt->execute([$slug]);

    if ($checkStmt->fetch()) {
        http_response_code(400);
        echo json_encode(['error' => 'Une catégorie avec ce nom existe déjà']);
        exit;
    }

    // ===== UPLOAD IMAGE =====
    $uploadDir = __DIR__ . "/../../../uploads/categories/";

    // Création du dossier si nécessaire
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $file = $_FILES['image'];

    // Récupération extension fichier
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);

    // Génération nom unique pour éviter collisions
    $fileName = uniqid('category_', true) . '.' . $extension;

    $destination = $uploadDir . $fileName;

    // Déplacement fichier depuis le dossier temporaire
    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        throw new Exception("Erreur lors de l'upload de l'image");
    }

    // Chemin stocké en base (relatif)
    $imagePath = "uploads/categories/" . $fileName;

    // ===== INSERTION EN BASE DE DONNEES =====
    $stmt = $pdo->prepare("
        INSERT INTO categories (name, slug, image_path)
        VALUES (?, ?, ?)
    ");
    $stmt->execute([$name, $slug, $imagePath]);

    // Réponse succès
    echo json_encode([
        'success' => true,
        'message' => 'Catégorie ajoutée avec succès'
    ]);

} catch (Exception $e) {

    // Gestion des erreurs serveur
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}