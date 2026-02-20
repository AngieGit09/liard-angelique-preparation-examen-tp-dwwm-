<?php
// ========= API ADMIN - STATISTIQUES DASHBOARD =========
// Endpoint sécurisé permettant de récupérer des statistiques
// pour le tableau de bord administrateur (nombre total de produits
// et dernier produit ajouté).

// Activation de l’affichage des erreurs (environnement de développement)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Autorise les requêtes depuis le front React (localhost:5173)
header('Access-Control-Allow-Origin: http://localhost:5173');

// Autorise l’envoi des cookies de session (authentification admin)
header('Access-Control-Allow-Credentials: true');

// Format de réponse JSON (API REST)
header('Content-Type: application/json');

// Démarrage de la session PHP pour vérifier l’authentification admin
session_start();

// Vérification de la présence d’un administrateur connecté
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401); // Non autorisé
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}

// Inclusion de la connexion sécurisée à la base de données (PDO)
require_once '../../config/database.php';

try {

    // ===== NOMBRE TOTAL DE PRODUITS =====
    // Requête permettant de compter le nombre total d’articles en base
    $stmt = $pdo->query("SELECT COUNT(*) AS total FROM products");
    $totalProducts = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // ===== DERNIER PRODUIT AJOUTE =====
    // Récupération du dernier produit inséré
    // (ordre décroissant sur l'id comme indicateur chronologique)
    $stmt = $pdo->query("SELECT title FROM products ORDER BY id DESC LIMIT 1");

    $lastProduct = $stmt->fetch(PDO::FETCH_ASSOC);

    // Réponse JSON envoyée au front-end (dashboard admin)
    echo json_encode([
        'totalProducts' => (int) $totalProducts,
        'lastProduct' => $lastProduct ? $lastProduct['title'] : null
    ]);

} catch (PDOException $e) {

    // Gestion des erreurs serveur liées à la base de données
    http_response_code(500);

    echo json_encode([
        'error' => 'Erreur serveur',
        'message' => $e->getMessage()
    ]);
}