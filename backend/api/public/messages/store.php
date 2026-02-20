<?php

// ========= API PUBLIC - FORMULAIRE DE CONTACT =========
// Endpoint public permettant d’enregistrer un message
// envoyé depuis le formulaire de contact du front React.
// Implémente validation, gestion CORS et insertion sécurisée en base.


// ==== HEADERS CORS ====
// Format de réponse JSON
header("Content-Type: application/json");

// Autorise les requêtes provenant du front React
header("Access-Control-Allow-Origin: http://localhost:5173");

// Méthodes autorisées pour cet endpoint
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Headers autorisés (JSON)
header("Access-Control-Allow-Headers: Content-Type");


// ==== GESTION PREFLIGHT (OPTIONS) ====
// Réponse immédiate pour la requête préliminaire envoyée par le navigateur
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Inclusion de la connexion sécurisée à la base de données (PDO)
require_once '../../../config/database.php';


// ==== VERIFICATION DE LA METHODE HTTP ====
// L’API accepte uniquement les requêtes POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Méthode non autorisée
    echo json_encode(["error" => "Méthode non autorisée"]);
    exit;
}


// ==== LECTURE ET DECODAGE DU BODY JSON ====
// Récupération des données envoyées par le front (fetch + JSON)
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// Vérification que les données sont valides
if (!$data) {
    http_response_code(400); // Requête invalide
    echo json_encode(["error" => "Données invalides ou body vide"]);
    exit;
}


// ==== VALIDATION DES CHAMPS OBLIGATOIRES ====
// Vérifie la présence des champs requis avant insertion
$required = ["name", "firstname", "email", "message"];

foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(422); // Données invalides
        echo json_encode(["error" => "Champ manquant : $field"]);
        exit;
    }
}


// ==== INSERTION EN BASE DE DONNEES ====
// Insertion sécurisée via requête préparée (protection contre injection SQL)
try {
    $stmt = $pdo->prepare("
        INSERT INTO messages (nom, prenom, email, telephone, categorie, message)
        VALUES (:nom, :prenom, :email, :telephone, :categorie, :message)
    ");

    $stmt->execute([
        // Nettoyage basique des données (protection XSS côté affichage futur)
        ":nom"       => htmlspecialchars($data["name"]),
        ":prenom"    => htmlspecialchars($data["firstname"]),
        ":email"     => htmlspecialchars($data["email"]),
        ":telephone" => htmlspecialchars($data["phone"] ?? ""),
        ":categorie" => htmlspecialchars($data["category"] ?? ""),
        ":message"   => htmlspecialchars($data["message"]),
    ]);

    // Code HTTP 201 : ressource créée avec succès
    http_response_code(201);

    echo json_encode([
        "message" => "Message enregistré avec succès"
    ]);

} catch (PDOException $e) {

    // Gestion des erreurs serveur liées à la base de données
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur base de données : " . $e->getMessage()
    ]);
}