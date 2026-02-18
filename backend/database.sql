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


-- CREATION TABLES     === TABLES ===
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
    display_order INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nom VARCHAR(150) NOT NULL,
    prenom VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telephone VARCHAR(50),

    categorie VARCHAR(100),
    message TEXT NOT NULL,

    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERTION 
-- Insertion Table admin
INSERT INTO admins (username, password_hash)
VALUES 
('Emma', 'HASH_GENERER'),
('Lucas', 'HASH8GENERER');

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
),
(
'Table basse en bois',
'Table basse en bois peinte en couleur vert olive',
'Cette table a été entièrement poncée, traitée puis peinte dans notre atelier.',
'Table basse',
250.00,
1,
0
),
(
'Table à manger',
'Table à manger en bois avec pied central',
'Cette table a été chiné lors d''un vide grenier, elle a été rénovée et traitée par nos soins.',
'Table à manger',
600.00,
1,
0
),
(
'Table à manger',
'Grande table à manger pouvant aller jusqu''à 16 couverts  ',
'Cette table en chêne à pourcouru les années dans la même famille puis laissée à l''abandon elle nous a été confiée pour lui donner une seconde vie, elle a été rénovée et traitée par nos soins.',
'Table à manger',
950.00,
1,
0
),
(
'Table de chevet',
'Tablede chevet en bois',
'Cette table de chevet a été chiné lors d''un vide grenier, elle a été rénovée et traitée par nos soins.',
'Table de chevet',
60.00,
2,
0
),
(
'Table de chevet',
'Table de chevet en bois de couleur blanche',
'Cette table de chevet a été nous a été cédé, elle a été rénovée, peinte puis traitée par nos soins.',
'Table de chevet',
55.00,
2,
0
),
(
'Bureau d''écolier',
'Bureau d''écolier en bois',
'Cet ancien bureau d''écolier a été récupéré lors d''une vente aux enchères dans une anciennne école, il a été rénové mais laissé dans son style pour garder tout son charme d''antant.',
'Bureau écolier',
150.00,
3,
0
),
(
'Bureau en bois',
'Bureau en bois',
'Ce bureau en bois a été récupéré lors d''un vide maison, nous avons eu un coup de coeur pour son style. Il a été rénové et traité dans notre atelier.',
'Bureau',
90.00,
3,
0
),
(
'Bureau en bois',
'Bureau en bois',
'Ce bureau devait être jeté avant d''être récupéré par notre équipe, nous avons eu un coup de coeur pour son style. Il a été rénové et traité dans notre atelier.',
'Bureau',
40.00,
3,
0
),
(
'Banc',
'Banc en bois',
'Ce banc public a été récupéré lors d''une vente aux enchères, la commune voulait changer tout son mobilier urbain nous avons donc pu récupérer ce magnifique banc. Il est passé entre nos mains pour lui redonner une seconde jeunesse. Il a été renové puis traité pour garantir une efficacité contre les imtempéries',
'Bureau',
180.00,
4,
0
),
(
'Tabouret',
'Tabouret',
'Ce tabouret devait être jeté, il ne lui resté plus que 3 pieds, mais après être passé entre nos mains il a récupéré toute sa solidité et beauté.',
'Tabouret',
35.00,
4,
0
),
(
'Malette',
'Malette entiérement restaurée',
'Cette malette a été récupéré lors d''un vide maison nous avons eu un grand coup de coeur pour son style et son coté pratique. Elle a nécessité une petite renovation puis un traitement',
'Accesoires',
65.00,
4,
0
);

-- Insertion Table products_images
INSERT INTO product_images (product_id, image_path, display_order)
VALUES

-- Produit 1 : Table basse en bois de hêtre
(1, 'uploads/products/images/table-basse.png', 1),
(1, 'uploads/products/images/table-basse2.png', 2),
(1, 'uploads/products/images/table-basse3.png', 3),
(1, 'uploads/products/images/table_basse.png', 4),

-- Produit 2 : Table à manger
(2, 'uploads/products/images/table.png', 1),
(2, 'uploads/products/images/table1.png', 2),
(2, 'uploads/products/images/table2.png', 3),
(2, 'uploads/products/images/table.png', 4),

-- Produit 3 : Bureau industriel
(3, 'uploads/products/images/bureau4.jpg', 1),
(3, 'uploads/products/images/bureau1.jpg', 2),
(3, 'uploads/products/images/bureau6.jpg', 3),
(3, 'uploads/products/images/bureau5.jpg', 4),

-- Produit 4 : Cheval à bascule
(4, 'uploads/products/images/rocking-horse.png', 1),
(4, 'uploads/products/images/rocking-horse-1.jpg', 2),
(4, 'uploads/products/images/rocking-horse.png', 3),
(4, 'uploads/products/images/rocking-horse-1.jpg', 4),

-- Produit 5 : Lit en bois
(5, 'uploads/products/images/bed.png', 1),
(5, 'uploads/products/images/lit2.jpg', 2),
(5, 'uploads/products/images/lit3.jpg', 3),
(5, 'uploads/products/images/lit4.jpg', 4),
(5, 'uploads/products/images/lit5.jpg', 5),

-- Produit 6 : Table basse en chêne (BEST SELLER)
(6, 'uploads/products/images/table_basse.png', 1),
(6, 'uploads/products/images/table-basse1.png', 2),
(6, 'uploads/products/images/table-basse2.png', 3),
(6, 'uploads/products/images/table-basse3.png', 4),

-- Produit 7 : Table basse 
(7, 'uploads/products/images/table_basse.png', 1),
(7, 'uploads/products/images/table-basse3.png', 2),
(7, 'uploads/products/images/table-basse2.png', 3),
(7, 'uploads/products/images/table_basse.png', 4),

-- Produit 8 : Table à manger
(8, 'uploads/products/images/table1.png', 1),
(8, 'uploads/products/images/table.png', 2),
(8, 'uploads/products/images/table2.png', 3),
(8, 'uploads/products/images/table1.png', 4),

-- Produit 9 : Table à manger
(9, 'uploads/products/images/table2.png', 1),
(9, 'uploads/products/images/table1.png', 2),
(9, 'uploads/products/images/table.png', 3),
(9, 'uploads/products/images/table2.png', 4),

-- Produit 10 : Table de chevet
(10, 'uploads/products/images/night-table.png', 1),
(10, 'uploads/products/images/table-de-chevet2.jpg', 2),
(10, 'uploads/products/images/table-de-chevet3.jpg', 3),
(10, 'uploads/products/images/table-de-chevet4.jpg', 4),
(10, 'uploads/products/images/table-de-chevet5.jpg', 5),

-- Produit 11 : Table de chevet
(11, 'uploads/products/images/table-de-chevet5.jpg', 1),
(11, 'uploads/products/images/table-de-chevet1.png', 2),
(11, 'uploads/products/images/table-de-chevet3.jpg', 3),
(11, 'uploads/products/images/table-de-chevet4.jpg', 4),

-- Produit 12 : Bureau écolier
(12, 'uploads/products/images/bureau.png', 1),
(12, 'uploads/products/images/bureau7.jpg', 2),
(12, 'uploads/products/images/bureau6.jpg', 3),
(12, 'uploads/products/images/bureau5.jpg', 4),

-- Produit 13 : Bureau 
(13, 'uploads/products/images/bureau5.jpg', 1),
(13, 'uploads/products/images/bureau.png', 2),
(13, 'uploads/products/images/bureau6.jpg', 3),
(13, 'uploads/products/images/bureau7.jpg', 4),

-- Produit 14 : Bureau 
(14, 'uploads/products/images/bureau6.jpg', 1),
(14, 'uploads/products/images/bureau5.jpg', 2),
(14, 'uploads/products/images/bureau4.jpg', 3),
(14, 'uploads/products/images/bureau7.jpg', 4),

-- Produit 15 : Banc
(15, 'uploads/products/images/bench.png', 1),
(15, 'uploads/products/images/banc1.png', 2),
(15, 'uploads/products/images/banc2.png', 3),
(15, 'uploads/products/images/banc3.png', 4),
(15, 'uploads/products/images/banc4.png', 5),

-- Produit 16 : Tabouret
(16, 'uploads/products/images/tabouret.png', 1),
(16, 'uploads/products/images/tabouret1.png', 2),
(16, 'uploads/products/images/tabouret.png', 3),
(16, 'uploads/products/images/tabouret1.png', 4),

-- Produit 17 : Malette
(17, 'uploads/products/images/malette2.png', 1),
(17, 'uploads/products/images/malette1.png', 2),
(17, 'uploads/products/images/malette2.png', 3),
(17, 'uploads/products/images/malette1.png', 4);