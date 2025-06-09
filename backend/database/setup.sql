-- Create products table
CREATE TABLE `products` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 34 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Create product_details table
CREATE TABLE `product_details` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `product_id` int(11) NOT NULL,
    `price` decimal(10, 2) NOT NULL,
    `brand` varchar(255) DEFAULT NULL,
    `image` varchar(255) DEFAULT NULL,
    `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `product_id` (`product_id`),
    CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Create users_ table
CREATE TABLE `users_` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `name` varchar(255) DEFAULT NULL,
    `role` int(11) DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 31 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Create about_us table
CREATE TABLE `about_us` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `description` TEXT NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Insert data into products table
INSERT INTO products (id, name) VALUES
(16, 'Nike Hoodie'),
(17, 'Adidas Shorts'),
(18, 'Puma T-Shirt'),
(19, 'Under Armour Tank Top'),
(20, 'Reebok Sneakers'),
(21, 'Nike Air Max 270'),
(22, 'Adidas Ultraboost 22'),
(23, 'Puma Cali Star'),
(24, 'Under Armour Favorite Hat'),
(25, 'Reebok Lux Jogger Pants'),
(26, 'Lululemon Align High-Rise Pant'),
(27, 'Lululemon Energy Bra'),
(28, 'Gymshark Vital Seamless Leggings'),
(29, 'Alo Yoga High-Waist Airlift Legging'),
(30, 'TYR Durafast Elite Maxfit Swimsuit');

-- Insert data into product_details table
INSERT INTO product_details (product_id, price, brand, image, modified_at) VALUES
(16, 61.00, 'Nike', '../images/nike-hoodie.jpg', '2025-05-28 10:00:54'),
(17, 40.00, 'Adidas', '../images/adidas-shorts.jpg', '2025-05-26 15:57:07'),
(18, 30.00, 'Puma', '../images/puma-t-shirt.jpg', '2025-05-26 15:00:53'),
(19, 35.00, 'Under Armour', '../images/under-armour-tank-top.jpg', '2025-05-26 15:00:53'),
(20, 85.00, 'Reebok', '../images/reebok-sneakers.jpg', '2025-05-26 15:00:53'),
(21, 120.00, 'Nike', '../images/nike-air-max-270.jpg', '2025-05-26 15:00:53'),
(22, 140.00, 'Adidas', '../images/adidas-ultraboost-22.jpg', '2025-05-26 15:00:53'),
(23, 90.00, 'Puma', '../images/puma-cali-star.jpg', '2025-05-26 15:00:53'),
(24, 20.00, 'Under Armour', '../images/ua-favorite-hat.jpg', '2025-05-26 15:00:53'),
(25, 65.00, 'Reebok', '../images/reebok-lux-jogger.jpg', '2025-05-26 15:00:53'),
(26, 98.00, 'Lululemon', '../images/lululemon-align-pant.jpg', '2025-05-26 15:00:53'),
(27, 48.00, 'Lululemon', '../images/lululemon-energy-bra.jpg', '2025-05-26 15:00:53'),
(28, 55.00, 'Gymshark', '../images/gymshark-vital-leggings.jpg', '2025-05-26 15:00:53'),
(29, 110.00, 'Alo Yoga', '../images/alo-yoga-airlift-legging.jpg', '2025-05-26 15:00:53'),
(30, 75.00, 'TYR', '../images/tyr-maxfit-swimsuit.jpg', '2025-05-26 15:00:53');

-- Insert data into about_us table
INSERT INTO about_us (description) VALUES
('EVB Sport is dedicated to providing top-notch sports equipment and accessories to athletes and enthusiasts worldwide.');