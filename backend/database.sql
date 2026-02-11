-- === BASE DE DONNEES ===

-- CREATION BASE DE DONNEES
CREATE DATABASE renomeuble_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;


-- CREATION UTILISATEUR
CREATE USER 'renomeuble_user'@'localhost'
IDENTIFIED BY 'Dev2026!';

GRANT ALL PRIVILEGES ON renomeuble_db.*
TO 'renomeuble_user'@'localhost';

FLUSH PRIVILEGES;


-- UTILISATION DE LA BASE
USE renomeuble_db;


-- === TABLES ===

-- Table admin 
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table products (fiche détail du produit)
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    story TEXT,
    function VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE
);

-- Table products images (images fiche détail du produit)
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- Table message Formulaire de contact
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERTION 
-- Insertion Table admin
INSERT INTO admins (username, password_hash)
VALUES 
('emma', 'HASH_GENERER'),
('lucas', 'HASH8GENERER');

-- Insertion table categories
INSERT INTO categories (name, slug, image_path)
VALUES
('Meubles de salon', 'meubles-salon', 'uploads/categories/table_basse.png'),
('Meubles de chambre', 'meubles-chambre', 'uploads/categories/bed.png'),
('Meubles de bureau', 'meubles-bureau', 'uploads/categories/bureau.png'),
('Accessoires', 'accessoires', 'uploads/categories/rocking-horse.png');

-- Insertion table products
INSERT INTO products
(title, description, story, function, price, category_id, is_featured)
VALUES
(
'Table basse en bois de hêtre',
'Table basse en bois de hêtre restaurée à la main.',
'Cette table a été entièrement poncée, traitée et vernie dans notre atelier.',
'Table basse',
300.00,
1,
0
),
(
'Table à manger',
'Table à manger vintage.',
'Cette table a été repeinte et protégée avec une finition satinée.',
'Table',
250.00,
1,
0
),
(
'Bureau industriel métal et bois',
'Bureau style industriel.',
'Ce bureau associe bois massif et structure en métal noir.',
'Bureau',
420.00,
3,
0
),
(
'Cheval à bascule en bois',
'Cheval à bascule en bois fait main.',
'Création artisanale unique fait par un passionné du bois puis restauré par nos soins.',
'Accessoire jeux',
95.00,
4,
0
),
(
'Lit en bois',
'Lit en bois datant de 1950.',
'Ce lit à déjà vécu plusieurs dizaines de décennies, 
et grâce à notre restauration il est de nouveau au goût du jour.',
'Lit',
450.00,
2,
0
),
(
'Table basse en chêne',
'Table basse en chêne.',
'Cette table a été restaurée dans le respect des techniques traditionnelles.',
'Table basse',
250.00,
1,
1
);
