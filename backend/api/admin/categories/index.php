<?php
// ========= API ADMIN - LISTE DES CATEGORIES =========
// Endpoint sécurisé permettant de récupérer toutes les catégories.
// Utilisé dans la page de gestion des catégories (back-office admin).


// ===== DEBUG (ENVIRONNEMENT DEVELOPPEMENT) =====
ini_set('display_errors', 1);
error_reporting(E_ALL);


// ===== HEADERS =====
// Format JSON pour la réponse
header('Content-Type: application/json');

// Autorise les requêtes depuis le front React (admin)
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l'envoi des cookies de session (authentification)
header('Access-Control-Allow-Credentials: true');


// ===== SESSION =====
session_start();

// Vérification que l'utilisateur est bien connecté en tant qu'administrateur
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401); // Non autorisé
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}


// ===== CONNEXION BASE DE DONNEES =====
require_once '../../../config/database.php';

try {

    // ===== RECUPERATION DES CATEGORIES =====
    // On récupère les informations nécessaires pour l'affichage admin
    $stmt = $pdo->query("
        SELECT id, name, slug, image_path, created_at
        FROM categories
        ORDER BY created_at DESC
    ");

    // Récupération sous forme de tableau associatif
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retour des données au front
    echo json_encode($categories);

} catch (PDOException $e) {

    // Gestion des erreurs serveur
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}