<?php

require_once __DIR__ . '/../config/cors.php';

setCorsHeadersPublic();
header('Content-Type: application/json');

session_start();

if (!isset($_SESSION['admin_id'])) {

    http_response_code(401);

    echo json_encode([
        "error" => "Non autorisé"
    ]);

    exit;
}