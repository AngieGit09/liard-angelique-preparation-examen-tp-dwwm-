<?php

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

setCorsHeadersPublic();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Méthode non autorisée"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Body JSON invalide"]);
    exit;
}

$required = ["name", "firstname", "email", "message"];

foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(422);
        echo json_encode(["error" => "Champ manquant : $field"]);
        exit;
    }
}

try {

    $stmt = $pdo->prepare("
        INSERT INTO messages (nom, prenom, email, telephone, categorie, message)
        VALUES (:nom, :prenom, :email, :telephone, :categorie, :message)
    ");

    $stmt->execute([
        ":nom"       => $data["name"],
        ":prenom"    => $data["firstname"],
        ":email"     => $data["email"],
        ":telephone" => $data["phone"] ?? "",
        ":categorie" => $data["category"] ?? "",
        ":message"   => $data["message"]
    ]);

    http_response_code(201);

    echo json_encode([
        "success" => true,
        "message" => "Message enregistré"
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}