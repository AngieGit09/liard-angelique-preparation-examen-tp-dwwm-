<?php

// ===== ENVOI DE MESSAGE (FORMULAIRE CONTACT) =====
// Permet d'enregistrer un message envoyé depuis le formulaire de contact.
// Vérifie les champs obligatoires avant insertion en base de données.

require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/database.php';

// Autorise les requêtes front → back
setCorsHeadersPublic();

// Format JSON
header('Content-Type: application/json');

// ==== VÉRIFICATION DE LA MÉTHODE HTTP ====
// Autorise uniquement les requêtes POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Méthode non autorisée"]);
    exit;
}

// Récupère le body JSON envoyé par le front
$data = json_decode(file_get_contents("php://input"), true);

// Vérifie que le JSON est valide
if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Body JSON invalide"]);
    exit;
}

// ==== VALIDATION DES CHAMPS ====
// Liste des champs obligatoires
$required = ["name", "firstname", "email", "message"];

foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(422);
        echo json_encode(["error" => "Champ manquant : $field"]);
        exit;
    }
}

try {

    // ==== INSERTION DU MESSAGE ====
    $stmt = $pdo->prepare("
        INSERT INTO messages (nom, prenom, email, telephone, categorie, message)
        VALUES (:nom, :prenom, :email, :telephone, :categorie, :message)
    ");

    $stmt->execute([
        ":nom"       => $data["name"],
        ":prenom"    => $data["firstname"],
        ":email"     => $data["email"],
        ":telephone" => $data["phone"] ?? "",      // Champ optionnel
        ":categorie" => $data["category"] ?? "",   // Champ optionnel
        ":message"   => $data["message"]
    ]);

    // Code 201 = ressource créée
    http_response_code(201);

    echo json_encode([
        "success" => true,
        "message" => "Message enregistré"
    ]);

} catch (PDOException $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}
?>