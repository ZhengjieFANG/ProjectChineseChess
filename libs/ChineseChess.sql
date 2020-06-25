-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 27, 2016 at 11:57 PM
-- Server version: 5.7.13-0ubuntu0.16.04.2
-- PHP Version: 7.0.8-0ubuntu0.16.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ChineseChess`
--
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tab;
DROP TABLE IF EXISTS amitie;
DROP TABLE IF EXISTS partie;
DROP TABLE IF EXISTS chat;


-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT 'clé primaire, identifiant numérique auto incrémenté',
  `pseudo` varchar(20) CHARACTER SET latin1 NOT NULL COMMENT 'pseudo',
  `passe` varchar(20) CHARACTER SET latin1 NOT NULL COMMENT 'mot de passe',
  `etatReady` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'indique si l''utilisateur est ready',
  `etatPage` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'indique la page ou l''utilisateur se situe',
  `partieAssiste` int(11) DEFAULT NULL COMMENT 'indique la partie ou l''utilisateur assiste',
  `mmr` int(11) NOT NULL DEFAULT '1000' COMMENT 'indique le score de l''utilisateur',
  `couleur` varchar(10) CHARACTER SET latin1 NOT NULL DEFAULT 'black' COMMENT 'indique la couleur préférée de l''utilisateur, en anglais',
  `hash` CHAR(32) NOT NULL COMMENT 'hash code genere par md5(id)',
   PRIMARY KEY (`id`),
   UNIQUE (`pseudo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Table structure for table `tab`
--
-- tab ：
--
-- -id
-- -onReady : bool => l’état indiquant la table est prête à lancer une partie
-- -sit1 : idUser=>la chaise est occupée par idUser / null=>la chaise est vide (FK)
-- -sit2 : idUser=>la chaise est occupée par idUser / null=>la chaise est vide (FK)

-- UPDATE table SET column = NULL;

CREATE TABLE `tab` (
  `id` int(11) NOT NULL COMMENT 'Clé primaire table',
  `onReady` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'indique si la table est ready',
  `sit1` int(11) DEFAULT NULL COMMENT 'idUser sit 1',
  `sit2` int(11) DEFAULT NULL COMMENT 'idUser sit 2',
  PRIMARY KEY (`id`),
  FOREIGN KEY (sit1) REFERENCES users(id),
  FOREIGN KEY (sit2) REFERENCES users(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


--
-- Table structure for table `amitie`
--
-- table d’amitié :
--
-- 	-id_Amitie
-- 	-id_user1
-- 	-id_user2

CREATE TABLE `amitie` (
  `id` int(11) NOT NULL COMMENT 'Clé primaire table' AUTO_INCREMENT,
  `idAmi1` int(11) NOT NULL COMMENT 'idUser ami 1',
  `idAmi2` int(11) NOT NULL COMMENT 'idUser ami 2',
  PRIMARY KEY (`id`),
  FOREIGN KEY (idAmi1) REFERENCES users(id),
  FOREIGN KEY (idAmi2) REFERENCES users(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Table structure for table `partie`
--
-- Partie:
-- id
-- id_table(optionnel)
-- configuration     json_stringfy
-- id_User1
-- id_User2
-- etatPartie : 1/0 (en train ou fini)

CREATE TABLE `partie` (
  `id` int(11) NOT NULL COMMENT 'Clé primaire table' AUTO_INCREMENT,
  `idTable` int(11) NOT NULL COMMENT 'sur quelle table la partie commence',
  `idUser1` int(11) NOT NULL COMMENT 'idUser 1 commence le coup',
  `idUser2` int(11) NOT NULL COMMENT 'idUser 2',
  `etatPartie` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'etat de partie',
  `pace` JSON DEFAULT NULL COMMENT 'pace du match',
  `playerMy` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>tour de User1, -1=>tour de User2',
  PRIMARY KEY (`id`),
  FOREIGN KEY (idTable) REFERENCES tab(id),
  FOREIGN KEY (idUser1) REFERENCES users(id),
  FOREIGN KEY (idUser1) REFERENCES users(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Table structure for table `chat`
--
-- id
-- id_partie
-- id_user
-- texte
-- heure (permet de trier les messages pour afficher les plus récents)

CREATE TABLE `chat` (
  `id` int(11) NOT NULL COMMENT 'Identifiant du message',
  `idPartie` int(11) NOT NULL COMMENT 'Clé étrangère vers la table des parties',
  `idAuteur` int(11) NOT NULL COMMENT 'clé étrangère vers la table des Users',
  `texte` varchar(100) CHARACTER SET latin1 NOT NULL COMMENT 'Contenu du message',
  PRIMARY KEY (`id`),
  FOREIGN KEY (idPartie) REFERENCES partie(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `passe`, `etatReady`, `etatPage`,`mmr`, `couleur`,`hash`) VALUES
(1, 'wang', 'chess', 0, 0, 1000, 'orange',md5('wang')),
(2, 'fang', 'cc', 0, 0, 500, 'green',md5('fang')),
(3, 'maxime', 'echec', 0, 0, 1000, 'green', md5('maxime'));

--
-- Dumping data for table `tab`
--

INSERT INTO `tab` (`id`) VALUES
(1),
(2),
(3),
(4);

--
-- Dumping data for table `amitie`
--

INSERT INTO `amitie` (`id`,`idAmi1`,`idAmi2`) VALUES
(1, 1, 2),
(2, 1, 3);

--
-- Dumping data for table `partie`
--

INSERT INTO `partie` (`id`,`idTable`,`idUser1`,`idUser2`,`etatPartie`) VALUES
(1, 2, 3, 2, 0),
(2, 1, 3, 2, 0);

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `idPartie`, `idAuteur`, `texte`) VALUES
(1, 1, 3, 'Que penses-tu de la nouvelle organisation des cours en EBM ? Pas mal, non ?'),
(2, 2, 2, 'Que va faire la France, cette fois-ci ?'),
(3, 2, 2, 'Elle se qualifiera pour le mondial !'),
(6, 2, 1, 'Hum... Pas sûr... espérons-le ! '),
(5, 1, 2, 'Oui, tu as raison');

--
-- Indexes for dumped tables
--


-- ALTER TABLE `users`
--   ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'clé primaire, identifiant numérique auto incrémenté', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `partie`
--
ALTER TABLE `partie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'clé primaire, identifiant numérique auto incrémenté', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chat`
--

ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identifiant du chat', AUTO_INCREMENT=7;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
