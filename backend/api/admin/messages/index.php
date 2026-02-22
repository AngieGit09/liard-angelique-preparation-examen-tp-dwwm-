<?php
// ===============================
// API ADMIN - LISTE DES MESSAGES
// ===============================

// Activation affichage erreurs (développement uniquement)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ==== HEADERS CORS ====
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');

// ==== SESSION ADMIN ====
session_start();

// Vérifie que l'admin est connecté
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}

// ==== CONNEXION BDD ====
require_once '../../../config/database.php';

try {

    // Récupération de tous les messages
    // Tri du plus récent au plus ancien
    $stmt = $pdo->query("
        SELECT *
        FROM messages
        ORDER BY created_at DESC
    ");

    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($messages);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur",
        "message" => $e->getMessage()
    ]);
}