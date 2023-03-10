import { createClassicConnexion } from "../config/database.js"

const con = createClassicConnexion()

// On supprime les tables
con.query("DROP TABLE IF EXISTS comments")
con.query("DROP TABLE IF EXISTS articles")
con.query("DROP TABLE IF EXISTS themes")
con.query("DROP TABLE IF EXISTS users")
con.query("DROP TABLE IF EXISTS sessions")

// Création des tables
con.query(`CREATE TABLE users(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    pseudo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME
)`)

con.query(`CREATE TABLE themes(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME
)`)

con.query(`CREATE TABLE articles (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    theme_id INT NOT NULL,
    article_id INT NOT NULL,
    content TEXT,
    FOREIGN KEY(theme_id) REFERENCES themes(id)
)`)

con.query(`CREATE TABLE comments (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    author_id INT NOT NULL,
    theme_id INT NOT NULL,
    content TEXT,
    FOREIGN KEY(author_id) REFERENCES users(id),
    FOREIGN KEY(theme_id) REFERENCES themes(id)
)`)

con.query(`
            CREATE TABLE sessions (
                sessid VARCHAR(50) NOT NULL PRIMARY KEY,
                content TEXT NOT NULL,
                expires_at DATETIME
            )
        `);

// Remplissage des tables

con.query(`INSERT INTO users (pseudo, email, password)
    VALUES
        ("yoyo", "yoyobg72@mail.com", "123456aZ@"),
        ("guigui", "guiguilamenace@mail.com", "1234567aZ@"),
        ("shannon", "shannontenervepas@mail.com", "123aZ@")
`)

con.query(`INSERT INTO themes (title, slug)
    VALUES 
        ("Fouesnant", "Fouesnant"),
        ("Kerlouan", "Kerlouan"),
        ("Crozon", "Crozon")
`)

con.query(`INSERT INTO articles (theme_id, article_id, content)
    VALUES
        (1, 1,  "Commune du Finistère, Fouesnant prend place sur la côte cornouaillaise, à une quinzaine de kilomètres de Quimper et à dix
                kilomètres de Concarneau. La ville bretonne forme ainsi, avec Bénodet et La Forêt-Fouesnant, la Riviera bretonne."),
        (1, 2,  "La ville de Bretagne est surtout un grand pôle touristique, dévoilant notamment des villas balnéaire du début du siècle dernier.Très appréciée pour ses
                différentes plages, l'archipel des Glénan, la ville de Fouesnant dévoile également un important patrimoine architectural témoignant de plusieurs siècles
                d'histoire, comme en témoignent les menhirs retrouvés sur place."),
        (1, 3,  "Beg Meil est une presqu'île de la commune de Fouesnant. Ne manquez pas le chemin côtier qui borde la Baie de la Forêt : vous y découvrirez de magnifiques petites criques de sables blanc et à l'eau turquoise."),
        (1, 4,  "Le chemin des douaniers offre une magnifique balade : vous découvrirez tour à tour la plage des oiseaux, petite plage avec un joli point de vue, la plage de Kerveltrec, et plage de Lantecost."),
        (1, 5,  "La plage de Lantecost est reconnaissable à son kiosque blanc. Il fait partie du parc du château de Bot Conan, datant à la Belle époque."),
        (1, 6,  "Juste au sud du cap de Beg Meil, il y a une jolie enfilade de criques."),
        (1, 7,  "La crique des Oiseaux, appelée ainsi pour les nombreux cormorans qui se sèchent les ailes sur un rocher proche, est la première."),
        (1, 8,  "On y accède depuis le parking de la plage des Dunes en prenant la rue du Chemin Creux, puis le premier chemin à droite qui conduit au sentier littoral."),
        (1, 9,  "Le prendre à droite. Bien abrité des vents d'ouest et du sud, on l'est un peu aussi prématurément du soleil en soirée."),
        (1, 10, "C’est du côté de Beg Meil à Fouesnant que l’on trouve la plage de Kerambigorn."),
        (1, 11, "Point de départ d’une vaste plage de sable (3.5 km en allant vers l’est) bordée par une agréable dune dans un environnement préservé, elle s’ouvre sur un océan souvent déchainé en hiver. Par temps dégagé on peut même voir l’archipel des Glénan (environ 15 km)."),
        (1, 12, "Par temps dégagé on peut même voir l’archipel des Glénan (environ 15 km)."),
        (1, 13, "Concarneau est le plus grand port thonier de France. Célèbre pour sa cité fortifée, la Ville bleue attire chaque année de nombreux touristes."),
        (1, 14, "La ville s'est développée autour de son port, grâce à l'industrie de la pêche. Construite tout d'abord sur une petite île, la ville s'est renforcée par des fortifications, créant ainsi la célèbre Ville Close."),
        (1, 15, "La partie la plus ancienne de la ville qui a été fortifiée dans les années 1300 ; elle est rattachée au continent par un pont.")
`)

con.query(`INSERT INTO comments (theme_id, author_id, content)
    VALUES
        (1, 3, "Merci pour le partage!"),
        (2, 2, "Merci pour le partage!"),
        (3, 1, "Merci pour le partage!"),
        (2, 2, "Merci pour le partage!"),
        (1, 3, "Merci pour le partage!")
`)

con.end()