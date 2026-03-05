<?php

require_once __DIR__ . '/../config/cors.php';

setCorsHeadersPublic();
header('Content-Type: application/json');

session_start();

$_SESSION = [];

session_destroy();

echo json_encode([
    "success" => true,
    "message" => "Déconnexion réussie"
]);