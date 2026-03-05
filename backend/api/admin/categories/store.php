<?php

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    $name = trim($_POST['name'] ?? '');

    if (!$name) {

        http_response_code(400);

        echo json_encode([
            'error' => 'Nom requis'
        ]);

        exit;
    }

    if (!isset($_FILES['image'])) {

        http_response_code(400);

        echo json_encode([
            'error' => 'Image requise'
        ]);

        exit;
    }

    $slug = strtolower($name);
    $slug = iconv('UTF-8', 'ASCII//TRANSLIT', $slug);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');

    $checkStmt = $pdo->prepare("SELECT id FROM categories WHERE slug = ?");
    $checkStmt->execute([$slug]);

    if ($checkStmt->fetch()) {

        http_response_code(400);

        echo json_encode([
            'error' => 'Catégorie déjà existante'
        ]);

        exit;
    }

    $uploadDir = __DIR__ . "/../../../uploads/categories/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

    $fileName = uniqid('category_', true) . '.' . $extension;

    move_uploaded_file(
        $_FILES['image']['tmp_name'],
        $uploadDir . $fileName
    );

    $imagePath = "uploads/categories/" . $fileName;

    $stmt = $pdo->prepare("
        INSERT INTO categories (name, slug, image_path)
        VALUES (?, ?, ?)
    ");

    $stmt->execute([$name, $slug, $imagePath]);

    echo json_encode([
        'success' => true
    ]);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'error' => 'Erreur serveur'
    ]);
}