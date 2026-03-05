<?php

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $story = $_POST['story'] ?? '';
    $price = $_POST['price'] ?? 0;
    $category_id = $_POST['category_id'] ?? 0;

    $is_featured = isset($_POST['is_featured']) ? (int)$_POST['is_featured'] : 0;

    if (!$title || !$description || !$price || !$category_id) {

        http_response_code(400);

        echo json_encode([
            "error" => "Champs obligatoires manquants"
        ]);

        exit;
    }

    if ($is_featured === 1) {
        $pdo->query("UPDATE products SET is_featured = 0");
    }

    $stmt = $pdo->prepare("
        INSERT INTO products (title, description, story, price, category_id, is_featured)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $title,
        $description,
        $story,
        $price,
        $category_id,
        $is_featured
    ]);

    $productId = $pdo->lastInsertId();

    if (!empty($_FILES['images']['name'][0])) {

        $uploadDir = __DIR__ . "/../../../uploads/products/";

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        foreach ($_FILES['images']['tmp_name'] as $index => $tmpName) {

            if ($_FILES['images']['error'][$index] === 0) {

                $extension = pathinfo($_FILES['images']['name'][$index], PATHINFO_EXTENSION);

                $fileName = uniqid("product_", true) . "." . $extension;

                move_uploaded_file($tmpName, $uploadDir . $fileName);

                $imagePath = "uploads/products/" . $fileName;

                $stmtImg = $pdo->prepare("
                    INSERT INTO product_images (product_id, image_path, display_order)
                    VALUES (?, ?, ?)
                ");

                $stmtImg->execute([
                    $productId,
                    $imagePath,
                    $index + 1
                ]);
            }
        }
    }

    echo json_encode([
        "success" => true
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}