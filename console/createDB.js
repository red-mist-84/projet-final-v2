import { createClassicConnexion } from "../config/database.js";
import argon2 from 'argon2';
const hash = await argon2.hash('Azerty123');
const con = createClassicConnexion()

con.query("DROP TABLE IF EXISTS comments")
con.query("DROP TABLE IF EXISTS themes")
con.query("DROP TABLE IF EXISTS users")
con.query("DROP TABLE IF EXISTS sessions")

// Création des tables
con.query(`CREATE TABLE users(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    pseudo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    roles VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME DEFAULT NULL
)`);

con.query(`CREATE TABLE themes(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME DEFAULT NULL
)`);

con.query(`CREATE TABLE comments (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    pseudo VARCHAR(255),
    theme_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY(theme_id) REFERENCES themes(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    updated_at DATETIME DEFAULT NULL
)`);

con.query(`
    CREATE TABLE sessions (
        sessid VARCHAR(50) NOT NULL PRIMARY KEY,
        content TEXT NOT NULL,
        expires_at DATETIME
    )
`);

// Remplissage des tables
con.query(`INSERT INTO users (pseudo, email, password, roles)
    VALUES
        ('mickael', 'mickael@mail.com', ?, 'ADMIN')`, [hash]
);


con.query(`INSERT INTO themes (title, slug)
    VALUES 
        ("Fouesnant", "Fouesnant"),
        ("Kerlouan", "Kerlouan"),
        ("Crozon", "Crozon")
`)

con.end()