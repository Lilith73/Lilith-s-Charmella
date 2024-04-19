CREATE DATABASE IF NOT EXISTS adatbazis;
USE adatbazis;

CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE termekek (
    termekId INT AUTO_INCREMENT PRIMARY KEY,
    ImageUrl VARCHAR(255) NOT NULL,
    nev VARCHAR(255) NOT NULL,
    szin VARCHAR(255) NOT NULL,
    ar INT NOT NULL
);

INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/ee_polo','Éjszakai Égbolt Póló', 'Fehér', 2990);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/ee_pulcsi','Éjszakai Égbolt Kapucnis Felső', 'Fehér', 4990);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/ee_tote','Éjszakai Égbolt Tote Bag', 'Fehér', 1990);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/szv_polo','Szív és Virágok Póló', 'Fehér', 2490);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/szv_pulcsi','Szív és Virágok Kapucnis Felső', 'Halvány Rózsaszín', 3990);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/szv_tote','Szív és Virágok Tote Bag', 'Bézs', 1490);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/lsz_polo','Szívek Póló', 'Fehér', 2990);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/lsz_pulcsi','Szívek Kapucnis Felső', 'Fehér Halvány Lila részletekkel', 3490);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/lsz_tote','Szívek Tote Bag', 'Fehér', 1590);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/ee_polo','Logó és Szlogen Póló', 'Fehér', 2490);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/ee_pulcsi','Logó és Szlogen Kapucnis Felső', 'Fehér', 5490);
INSERT INTO termekek (ImageUrl, nev, szin, ar) VALUES ('./img_main/ee_tote','Logó és Szlogen Tote Bag', 'Bézs', 2990);
