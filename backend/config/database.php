<?php

$host = 'localhost';
$dbname = 'renomeuble_db';
$username = 'renomeuble_user';
$password = 'MotDePasseUltraSecure123!';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
