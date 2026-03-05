<?php

require_once __DIR__ . '/../../../middleware/adminAuth.php';
require_once __DIR__ . '/../../../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;

if (!$id) {

    http_response_code(400);

    echo json_encode([
        'error' => 'ID manquant'
    ]);

    exit;
}

$stmt = $pdo->prepare("DELETE FROM messages WHERE id = ?");
$stmt->execute([$id]);

echo json_encode([
    'success' => true
]);