<?php
// ========= API ADMIN - MISE A JOUR D'UN PRODUIT (UPDATE) =========
// Endpoint sécurisé permettant de modifier un produit existant,
// gérer le statut best-seller et uploader de nouvelles images.
// Utilisé par le back-office React (ModalProduct en mode édition).


// ===== HEADERS CORS & FORMAT =====
// Format de réponse JSON (API REST)
header("Content-Type: application/json");

// Autorise les requêtes depuis le front admin (React en local)
header("Access-Control-Allow-Origin: http://localhost:5173");

// Autorise l’envoi des cookies de session (authentification admin)
header("Access-Control-Allow-Credentials: true");

// Méthodes HTTP autorisées pour cet endpoint
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Headers autorisés pour les requêtes (FormData / JSON)
header("Access-Control-Allow-Headers: Content-Type");

// Gestion de la requête preflight (OPTIONS) pour le CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclusion de la connexion sécurisée à la base de données (PDO)
require_once __DIR__ . "/../../../config/database.php";

try {
    // ===== RECUPERATION DES DONNEES DU FORMULAIRE (FormData) =====
    // Données envoyées depuis le back-office admin
    $id = $_POST['id'] ?? 0;
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $story = $_POST['story'] ?? ''; // Histoire du meuble (contenu éditorial)
    $price = $_POST['price'] ?? 0;
    $category_id = $_POST['category_id'] ?? 0;

    // Statut best-seller (0 ou 1)
    $is_featured = isset($_POST['is_featured']) ? (int)$_POST['is_featured'] : 0;

    // ===== VALIDATION DES CHAMPS OBLIGATOIRES =====
    // Vérifie les données essentielles avant la mise à jour
    if (empty($id) || empty($title) || empty($description) || empty($price) || empty($category_id)) {
        http_response_code(400); // Requête invalide
        echo json_encode(["error" => "Champs obligatoires manquants"]);
        exit;
    }

    // ===== GESTION DU BEST-SELLER =====
    // Logique métier : un seul produit peut être défini comme best-seller
    if ($is_featured === 1) {
        $pdo->query("UPDATE products SET is_featured = 0");
    }

    // ===== MISE A JOUR DU PRODUIT =====
    // Requête préparée sécurisée (protection contre injections SQL)
    // Mise à jour des informations principales du produit
    $stmt = $pdo->prepare("
        UPDATE products
        SET title = ?, description = ?, story = ?, price = ?, category_id = ?, is_featured = ?
        WHERE id = ?
    ");

    $stmt->execute([
        $title,
        $description,
        $story, // Contenu narratif du produit (valeur ajoutée UX)
        $price,
        $category_id,
        $is_featured,
        $id
    ]);

    // ===== UPLOAD DES NOUVELLES IMAGES =====
    // Vérifie la présence de fichiers envoyés via FormData (multi-images)
    if (!empty($_FILES['images']['name'][0])) {

        // Dossier de destination des images produits
        $uploadDir = __DIR__ . "/../../../uploads/products/";

        // Création du dossier s’il n’existe pas (upload dynamique)
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Parcours des images envoyées
        foreach ($_FILES['images']['tmp_name'] as $index => $tmpName) {
            if (!empty($tmpName)) {

                // Récupération du nom original et de l’extension
                $originalName = basename($_FILES['images']['name'][$index]);
                $extension = pathinfo($originalName, PATHINFO_EXTENSION);

                // Génération d’un nom unique pour éviter les conflits de fichiers
                $newFileName = uniqid("product_", true) . "." . $extension;
                $destination = $uploadDir . $newFileName;

                // Déplacement du fichier uploadé vers le dossier serveur
                if (move_uploaded_file($tmpName, $destination)) {

                    // Chemin enregistré en base (relatif au projet)
                    $imagePath = "uploads/products/" . $newFileName;

                    // Insertion de l’image dans la table product_images
                    // avec ordre d’affichage (display_order)
                    $stmtImg = $pdo->prepare("
                        INSERT INTO product_images (product_id, image_path, display_order)
                        VALUES (?, ?, ?)
                    ");

                    $stmtImg->execute([
                        $id,
                        $imagePath,
                        $index + 1 // Ordre d’affichage des images
                    ]);
                }
            }
        }
    }

    // Réponse JSON de succès pour le back-office admin
    echo json_encode([
        "success" => true,
        "message" => "Produit mis à jour avec succès"
    ]);

} catch (PDOException $e) {

    // Gestion des erreurs serveur (base de données)
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur : " . $e->getMessage()
    ]);
}