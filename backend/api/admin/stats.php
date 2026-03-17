<?php

// ===== DASHBOARD ADMIN =====
// Retourne des statistiques simples pour l'interface admin :
// - Nombre total de produits
// - Dernier produit ajouté

require_once __DIR__ . '/../../middleware/adminAuth.php';
require_once __DIR__ . '/../../config/database.php';

try {

    // ==== NOMBRE TOTAL DE PRODUITS ====
    $stmt = $pdo->query("SELECT COUNT(*) AS total FROM products");
    $totalProducts = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // ==== DERNIER PRODUIT AJOUTÉ ====
    $stmt = $pdo->query("SELECT title FROM products ORDER BY id DESC LIMIT 1");
    $lastProduct = $stmt->fetch(PDO::FETCH_ASSOC);

    // ==== RÉPONSE ====
    echo json_encode([
        'totalProducts' => (int)$totalProducts,
        'lastProduct' => $lastProduct['title'] ?? null
    ]);

} catch (PDOException $e) {

    // ==== ERREUR SERVEUR ====
    http_response_code(500);

    echo json_encode([
        'error' => 'Erreur serveur'
    ]);
}
?>