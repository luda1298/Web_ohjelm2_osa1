CREATE DATABASE IF NOT EXISTS athlete_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE athlete_db;

CREATE TABLE IF NOT EXISTS athletes (
    id INT AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    nickname VARCHAR(100),

    birth_date DATE NOT NULL,
    weight DECIMAL(5,2),

    image_url VARCHAR(2048),
    sport VARCHAR(100) NOT NULL,
    achievements TEXT
);