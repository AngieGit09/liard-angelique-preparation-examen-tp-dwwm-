<?php
// ========= API ADMIN - CREATION D'UN PRODUIT (STORE) =========
// Endpoint sécurisé permettant d'ajouter un nouveau produit,
// gérer le statut best-seller et uploader plusieurs images.
// Utilisé par le back-office React via FormData (ModalProduct en mode "add").


// ===== HEADERS CORS & FORMAT =====
// Définit le format de réponse en JSON (API REST)
header("Content-Type: application/json");

// Autorise les requêtes depuis le front admin (React en local)
header("Access-Control-Allow-Origin: http://localhost:5173");

// Autorise l'utilisation des cookies de session (authentification admin)
header("Access-Control-Allow-Credentials: true");

// Méthodes HTTP autorisées pour cet endpoint
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Headers autorisés (FormData / JSON)
header("Access-Control-Allow-Headers: Content-Type");

// Gestion de la requête preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclusion de la connexion sécurisée à la base de données (PDO)
require_once __DIR__ . "/../../../config/database.php";

try {
    // ===== RECUPERATION DES DONNEES DU FORMULAIRE (FormData) =====
    // Données envoyées depuis le back-office admin
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $story = $_POST['story'] ?? ''; // Histoire du meuble (contenu éditorial)
    $price = $_POST['price'] ?? 0;
    $category_id = $_POST['category_id'] ?? 0;

    // Statut best-seller (0 ou 1)
    $is_featured = isset($_POST['is_featured']) ? (int)$_POST['is_featured'] : 0;

    // ===== VALIDATION DES CHAMPS OBLIGATOIRES =====
    // Vérifie la présence des données essentielles avant insertion
    if (empty($title) || empty($description) || empty($price) || empty($category_id)) {
        http_response_code(400); // Requête invalide
        echo json_encode(["error" => "Champs obligatoires manquants"]);
        exit;
    }

    // ===== LOGIQUE METIER : GESTION DU BEST-SELLER =====
    // Un seul produit peut être défini comme best-seller à la fois
    if ($is_featured === 1) {
        $pdo->query("UPDATE products SET is_featured = 0");
    }

    // ===== INSERTION DU PRODUIT EN BASE DE DONNEES =====
    // Requête préparée sécurisée (protection contre injections SQL)
    $stmt = $pdo->prepare("
        INSERT INTO products (title, description, story, price, category_id, is_featured)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $title,
        $description,
        $story, // Contenu narratif pour enrichir la fiche produit
        $price,
        $category_id,
        $is_featured
    ]);

    // Récupération de l'ID du produit nouvellement créé
    $productId = $pdo->lastInsertId();

    // ===== UPLOAD DES IMAGES PRODUIT (MULTI-FICHIERS) =====
    // Vérifie la présence d’images envoyées via FormData
    if (!empty($_FILES['images']['name'][0])) {

        // Dossier de stockage des images produits
        $uploadDir = __DIR__ . "/../../../uploads/products/";

        // Création du dossier s’il n’existe pas (upload dynamique)
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Parcours des fichiers uploadés (multi-images)
        foreach ($_FILES['images']['tmp_name'] as $index => $tmpName) {

            // Vérification qu'il n'y a pas d'erreur lors de l'upload
            if ($_FILES['images']['error'][$index] === 0) {

                // Sécurisation du nom et récupération de l’extension
                $originalName = basename($_FILES['images']['name'][$index]);
                $extension = pathinfo($originalName, PATHINFO_EXTENSION);

                // Génération d’un nom unique pour éviter les conflits de fichiers
                $newFileName = uniqid("product_", true) . "." . $extension;
                $destination = $uploadDir . $newFileName;

                // Déplacement du fichier vers le serveur
                if (move_uploaded_file($tmpName, $destination)) {

                    // Chemin enregistré en base (chemin relatif au projet)
                    $imagePath = "uploads/products/" . $newFileName;

                    // Insertion de l’image dans la table product_images
                    // avec gestion de l’ordre d’affichage (display_order)
                    $stmtImg = $pdo->prepare("
                        INSERT INTO product_images (product_id, image_path, display_order)
                        VALUES (?, ?, ?)
                    ");
                    $stmtImg->execute([
                        $productId,
                        $imagePath,
                        $index + 1 // Ordre d'affichage des images
                    ]);
                }
            }
        }
    }

    // Réponse JSON de succès pour le back-office admin
    echo json_encode([
        "success" => true,
        "message" => "Produit ajouté avec succès"
    ]);

} catch (PDOException $e) {

    // Gestion des erreurs serveur liées à la base de données
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur : " . $e->getMessage()
    ]);
}