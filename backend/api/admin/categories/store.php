<?php

// ===== CRÉATION D’UNE CATÉGORIE =====
// Permet d’ajouter une nouvelle catégorie avec une image.
// Génère automatiquement un slug unique pour les URLs.

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    // ==== RÉCUPÉRATION DES DONNÉES ====
    $name = trim($_POST['name'] ?? '');

    // Vérifie que le nom est fourni
    if (!$name) {

        http_response_code(400);

        echo json_encode([
            'error' => 'Nom requis'
        ]);

        exit;
    }

    // Vérifie la présence d’une image
    if (!isset($_FILES['image'])) {

        http_response_code(400);

        echo json_encode([
            'error' => 'Image requise'
        ]);

        exit;
    }

    // ==== GÉNÉRATION DU SLUG ====
    // Transforme le nom en URL propre (ex: "Meubles Salon" → "meubles-salon")
    $slug = strtolower($name);
    $slug = iconv('UTF-8', 'ASCII//TRANSLIT', $slug);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');

    // Vérifie que la catégorie n'existe pas déjà
    $checkStmt = $pdo->prepare("SELECT id FROM categories WHERE slug = ?");
    $checkStmt->execute([$slug]);

    if ($checkStmt->fetch()) {

        http_response_code(400);

        echo json_encode([
            'error' => 'Catégorie déjà existante'
        ]);

        exit;
    }

    // ==== UPLOAD IMAGE ====
    $uploadDir = __DIR__ . "/../../../uploads/categories/";

    // Crée le dossier si inexistant
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Génère un nom unique pour éviter les conflits
    $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $fileName = uniqid('category_', true) . '.' . $extension;

    move_uploaded_file(
        $_FILES['image']['tmp_name'],
        $uploadDir . $fileName
    );

    $imagePath = "uploads/categories/" . $fileName;

    // ==== INSERTION EN BASE ====
    $stmt = $pdo->prepare("
        INSERT INTO categories (name, slug, image_path)
        VALUES (?, ?, ?)
    ");

    $stmt->execute([$name, $slug, $imagePath]);

    // ==== RÉPONSE ====
    echo json_encode([
        'success' => true
    ]);

} catch (Exception $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        'error' => 'Erreur serveur'
    ]);
}
?>