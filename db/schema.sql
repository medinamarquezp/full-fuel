/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

SHOW ENGINE INNODB STATUS;


--
-- Table structure for table `ccaas`
--

DROP TABLE IF EXISTS `ccaas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ccaas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ccaaID` varchar(10) UNIQUE NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`ccaaID`),
  INDEX(`id`),
  INDEX(`ccaaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `fuelstations`
--

DROP TABLE IF EXISTS `fuelstations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fuelstations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fuelstationID` int(10) unsigned UNIQUE NOT NULL,
  `ccaaID` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `postalCode` varchar(10) NOT NULL,
  `province` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `town` varchar(100) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `isAlwaysOpen` tinyint(1) NOT NULL,
  `timetable` varchar(150) NOT NULL,
  `bestDay` int(11) DEFAULT '1',
  `bestMoment` varchar(45) DEFAULT 'morning',
  `brandImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`fuelstationID`),
  UNIQUE KEY `id_UNIQUE` (`fuelstationID`),
  KEY `ID` (`id`) /*!80000 INVISIBLE */,
  KEY `NAME` (`name`) /*!80000 INVISIBLE */,
  KEY `LAT` (`latitude`) /*!80000 INVISIBLE */,
  KEY `LNG` (`longitude`) /*!80000 INVISIBLE */,
  KEY `fuelstation_ccaa_idx` (`ccaaID`) /*!80000 INVISIBLE */,
  KEY `id_idx` (`fuelstationID`),
  CONSTRAINT `fuelstation_ccaa` FOREIGN KEY (`ccaaID`) REFERENCES `ccaas` (`ccaaID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `fuelprices`
--

DROP TABLE IF EXISTS `fuelprices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fuelprices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fuelstationID` int(10) unsigned NOT NULL,
  `month` int(11) NOT NULL,
  `week` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `weekDay` int(11) NOT NULL,
  `hour` int(11) NOT NULL,
  `moment` varchar(45) NOT NULL,
  `fuelType` varchar(20) NOT NULL,
  `price` decimal(10,5) NOT NULL,
  `evolution` varchar(5) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fuelprices_fuelstation_idx` (`fuelstationID`) /*!80000 INVISIBLE */,
  KEY `price_index` (`price`),
  KEY `fuelType_index` (`fuelType`),
  KEY `fuelstationID_index` (`fuelstationID`),
  KEY `updatedAt_index` (`updatedAt` DESC),
  CONSTRAINT `price_fuelstation` FOREIGN KEY (`fuelstationID`) REFERENCES `fuelstations` (`fuelstationID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `fuelpricesdump`
--

DROP TABLE IF EXISTS `fuelpricesdump`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fuelpricesdump` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fuelstationID` int(10) unsigned NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `fuelType` varchar(20) NOT NULL,
  `max` decimal(10,5) NOT NULL,
  `min` decimal(10,5) NOT NULL,
  `avg` decimal(10,5) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fuelpricesdump_fuelstations_idx` (`fuelstationID`),
  KEY `fuelstationID_index` (`fuelstationID`),
  KEY `fuelType_index` (`fuelType`) /*!80000 INVISIBLE */,
  KEY `min_index` (`min`),
  CONSTRAINT `pricesdump_fuelstations` FOREIGN KEY (`fuelstationID`) REFERENCES `fuelstations` (`fuelstationID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fuelstationID` int(10) unsigned NOT NULL,
  `fuelType` varchar(20) NOT NULL,
  `numSubscriptions` int(11) DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `suscribers_fuelstation_idx` (`fuelstationID`),
  CONSTRAINT `suscribers_fuelstation` FOREIGN KEY (`fuelstationID`) REFERENCES `fuelstations` (`fuelstationID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `timetables`
--

DROP TABLE IF EXISTS `timetables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timetables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fuelstationID` int(10) unsigned NOT NULL,
  `weekDay` int(11) NOT NULL,
  `alwaysOpen` tinyint(1) DEFAULT NULL,
  `opening` varchar(50) DEFAULT NULL,
  `closing` varchar(50) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`fuelstationID`, `weekDay`),
  INDEX(`id`),
  CONSTRAINT `timetable_fuelstation` FOREIGN KEY (`fuelstationID`) REFERENCES `fuelstations` (`fuelstationID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

