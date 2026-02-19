<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../../../config/database.php";

try {
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $price = $_POST['price'] ?? 0;
    $category_id = $_POST['category_id'] ?? 0;
    $is_featured = isset($_POST['is_featured']) ? (int)$_POST['is_featured'] : 0;

    if (empty($title) || empty($description) || empty($price) || empty($category_id)) {
        http_response_code(400);
        echo json_encode(["error" => "Champs obligatoires manquants"]);
        exit;
    }

    // UN SEUL BEST SELLER 
if ($is_featured === 1) {
    $pdo->query("UPDATE products SET is_featured = 0");
}


    // INSERT PRODUIT
    $stmt = $pdo->prepare("
        INSERT INTO products (title, description, price, category_id, is_featured)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([$title, $description, $price, $category_id, $is_featured]);

    $productId = $pdo->lastInsertId();

    // UPLOAD + INSERT DANS product_images 
    if (!empty($_FILES['images']['name'][0])) {

        $uploadDir = __DIR__ . "/../../../uploads/products/";

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        foreach ($_FILES['images']['tmp_name'] as $index => $tmpName) {

            if ($_FILES['images']['error'][$index] === 0) {

                $originalName = basename($_FILES['images']['name'][$index]);
                $extension = pathinfo($originalName, PATHINFO_EXTENSION);

                $newFileName = uniqid("product_", true) . "." . $extension;
                $destination = $uploadDir . $newFileName;

                if (move_uploaded_file($tmpName, $destination)) {

                    $imagePath = "uploads/products/" . $newFileName;

                    // INSERT DANS lA TABLE product_images 
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
    }

    echo json_encode([
        "success" => true,
        "message" => "Produit ajouté avec images"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur : " . $e->getMessage()
    ]);
}
