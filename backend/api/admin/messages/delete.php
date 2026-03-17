<?php

// ===== SUPPRESSION D’UN MESSAGE =====
// Permet à l’administrateur de supprimer un message.
// Utilisé pour la gestion des demandes utilisateurs.

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

// Récupère les données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;

// Vérifie la présence de l'id
if (!$id) {

    http_response_code(400);

    echo json_encode([
        'error' => 'ID manquant'
    ]);

    exit;
}

// ==== SUPPRESSION DU MESSAGE ====
$stmt = $pdo->prepare("DELETE FROM messages WHERE id = ?");
$stmt->execute([$id]);

// ==== RÉPONSE ====
echo json_encode([
    'success' => true
]);
?>