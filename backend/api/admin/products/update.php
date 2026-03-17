<?php

// ===== MODIFICATION D’UN PRODUIT =====
// Permet de modifier un produit existant (infos + images).
// Gère :
// - Mise à jour des données
// - Suppression d’images
// - Ajout de nouvelles images
// - Gestion du produit "featured"

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    // ==== RÉCUPÉRATION DES DONNÉES ====
    $id = $_POST['id'] ?? 0;
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $story = $_POST['story'] ?? '';
    $price = $_POST['price'] ?? 0;
    $category_id = $_POST['category_id'] ?? 0;

    $is_featured = isset($_POST['is_featured']) ? (int)$_POST['is_featured'] : 0;

    // ==== VALIDATION ====
    if (!$id || !$title || !$description || !$price || !$category_id) {

        http_response_code(400);

        echo json_encode([
            "error" => "Champs obligatoires manquants"
        ]);

        exit;
    }

    // ==== GESTION DU PRODUIT FEATURED ====
    // Un seul produit peut être mis en avant
    if ($is_featured === 1) {
        $pdo->query("UPDATE products SET is_featured = 0");
    }

    // ==== MISE À JOUR DU PRODUIT ====
    $stmt = $pdo->prepare("
        UPDATE products
        SET title = ?, description = ?, story = ?, price = ?, category_id = ?, is_featured = ?
        WHERE id = ?
    ");

    $stmt->execute([
        $title,
        $description,
        $story,
        $price,
        $category_id,
        $is_featured,
        $id
    ]);

    // ==== SUPPRESSION DES IMAGES ====
    if (!empty($_POST['deleted_images'])) {

        $uploadDir = __DIR__ . "/../../../";

        foreach ($_POST['deleted_images'] as $imageId) {

            $stmt = $pdo->prepare("SELECT image_path FROM product_images WHERE id = ?");
            $stmt->execute([$imageId]);
            $img = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($img) {

                $filePath = $uploadDir . $img['image_path'];

                // Supprime le fichier physique
                if (file_exists($filePath)) {
                    unlink($filePath);
                }

                // Supprime en base
                $stmtDelete = $pdo->prepare("DELETE FROM product_images WHERE id = ?");
                $stmtDelete->execute([$imageId]);
            }
        }
    }

    // ==== AJOUT DES NOUVELLES IMAGES ====
    if (!empty($_FILES['images']['name'][0])) {

        $uploadDir = __DIR__ . "/../../../uploads/products/";

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Récupère le dernier ordre d'affichage
        $stmtOrder = $pdo->prepare("
            SELECT MAX(display_order) as max_order
            FROM product_images
            WHERE product_id = ?
        ");
        $stmtOrder->execute([$id]);
        $maxOrder = $stmtOrder->fetchColumn() ?? 0;

        foreach ($_FILES['images']['tmp_name'] as $index => $tmpName) {

            if (!empty($tmpName)) {

                $extension = pathinfo($_FILES['images']['name'][$index], PATHINFO_EXTENSION);

                $fileName = uniqid("product_", true) . "." . $extension;

                move_uploaded_file($tmpName, $uploadDir . $fileName);

                $imagePath = "uploads/products/" . $fileName;

                $stmtImg = $pdo->prepare("
                    INSERT INTO product_images (product_id, image_path, display_order)
                    VALUES (?, ?, ?)
                ");

                $stmtImg->execute([
                    $id,
                    $imagePath,
                    $maxOrder + $index + 1
                ]);
            }
        }
    }

    // ==== RÉPONSE ====
    echo json_encode([
        "success" => true
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}
?>