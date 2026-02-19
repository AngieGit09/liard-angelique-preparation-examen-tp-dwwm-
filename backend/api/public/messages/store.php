<?php

// ==== HEADERS CORS ====
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ==== GESTION PREFLIGHT (OPTIONS) ====
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../../config/database.php';

// ==== VERIFICATION METHODE ====
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Méthode non autorisée"]);
    exit;
}

// ==== LECTURE DU BODY JSON ====
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Données invalides ou body vide"]);
    exit;
}

// ==== VALIDATION DES CHAMPS REQUIS ====
$required = ["name", "firstname", "email", "message"];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(422);
        echo json_encode(["error" => "Champ manquant : $field"]);
        exit;
    }
}

// ==== INSERTION EN BASE ====
try {
    $stmt = $pdo->prepare("
        INSERT INTO messages (nom, prenom, email, telephone, categorie, message)
        VALUES (:nom, :prenom, :email, :telephone, :categorie, :message)
    ");

    $stmt->execute([
        ":nom"       => htmlspecialchars($data["name"]),
        ":prenom"    => htmlspecialchars($data["firstname"]),
        ":email"     => htmlspecialchars($data["email"]),
        ":telephone" => htmlspecialchars($data["phone"] ?? ""),
        ":categorie" => htmlspecialchars($data["category"] ?? ""),
        ":message"   => htmlspecialchars($data["message"]),
    ]);

    http_response_code(201);
    echo json_encode(["message" => "Message enregistré avec succès"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur base de données : " . $e->getMessage()]);
}