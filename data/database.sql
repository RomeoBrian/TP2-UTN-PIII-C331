CREATE DATABASE IF NOT EXISTS `tp-2-api`;
use `tp-2-api`;

CREATE TABLE `objetos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) NOT NULL,
  `createdat` datetime NOT NULL,
  `updatedat` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `variaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreVariacion` varchar(100) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT NULL,
  `afinidad` varchar(45) DEFAULT NULL,
  `poder` int DEFAULT NULL,
  `rareza` enum('comun','raro','poco comun','epico','legendario') NOT NULL DEFAULT 'comun',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `objetoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`objetoId`),
  CONSTRAINT `id` FOREIGN KEY (`objetoId`) REFERENCES `objetos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
