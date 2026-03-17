<?php

// ===== LISTE DES MESSAGES (ADMIN) =====
// Récupère tous les messages envoyés via le formulaire de contact.
// Accessible uniquement par un administrateur authentifié.

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

try {

    // ==== RÉCUPÉRATION DES MESSAGES ====
    $stmt = $pdo->query("
        SELECT *
        FROM messages
        ORDER BY created_at DESC
    ");

    // Retourne tous les messages (du plus récent au plus ancien)
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (PDOException $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        "error" => "Erreur serveur"
    ]);
}
?>