CREATE DATABASE  IF NOT EXISTS `intraedge` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `intraedge`;
-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: localhost    Database: intraedge
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit`
--

DROP TABLE IF EXISTS `audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `audit` (
  `vendorName` varchar(255) DEFAULT NULL,
  `contactPerson` varchar(255) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `scopeOfServices` varchar(255) DEFAULT NULL,
  `newSubmittal` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `record_id` varchar(64) DEFAULT NULL,
  `createdBY` varchar(255) DEFAULT NULL,
  `updatedBY` varchar(255) DEFAULT NULL,
  `createdOn` varchar(200) DEFAULT NULL,
  `updatedOn` varchar(200) DEFAULT NULL,
  `action` varchar(45) DEFAULT NULL,
  `changedat` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `consultant`
--

DROP TABLE IF EXISTS `consultant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `consultant` (
  `clientName` varchar(250) DEFAULT NULL,
  `recruiter` varchar(250) DEFAULT NULL,
  `accountManager` varchar(250) DEFAULT NULL,
  `uuid` varchar(45) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `ssn` varchar(10) DEFAULT NULL,
  `phNo` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `visa` varchar(45) DEFAULT NULL,
  `expiration` varchar(45) DEFAULT NULL,
  `i94date` varchar(45) DEFAULT NULL,
  `employmentType` varchar(45) DEFAULT NULL,
  `offerStatus` varchar(45) DEFAULT NULL,
  `bgvstartDate` varchar(45) DEFAULT NULL,
  `bgvendDate` varchar(45) DEFAULT NULL,
  `drugTeststartDate` varchar(45) DEFAULT NULL,
  `drugTestendDate` varchar(45) DEFAULT NULL,
  `ndastartDate` varchar(45) DEFAULT NULL,
  `ndaendDate` varchar(45) DEFAULT NULL,
  `ads` varchar(45) DEFAULT NULL,
  `client_email` varchar(100) DEFAULT NULL,
  `role` varchar(250) DEFAULT NULL,
  `sow` varchar(45) DEFAULT NULL,
  `sowSubmittedOn` varchar(45) DEFAULT NULL,
  `sowSubmittedBy` varchar(45) DEFAULT NULL,
  `cafeNumber` varchar(45) DEFAULT NULL,
  `po` varchar(45) DEFAULT NULL,
  `poLineNumber` varchar(45) DEFAULT NULL,
  `rate` varchar(45) DEFAULT NULL,
  `startDate` varchar(45) DEFAULT NULL,
  `endDate` varchar(45) DEFAULT NULL,
  `laptopNo` varchar(45) DEFAULT NULL,
  `employer` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `consultant_data`
--

DROP TABLE IF EXISTS `consultant_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `consultant_data` (
  `record_id` varchar(100) DEFAULT NULL,
  `data` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_consultant_update` BEFORE UPDATE ON `consultant_data` FOR EACH ROW BEGIN
    INSERT INTO consultant_audit
    SET action = 'update',
    data = OLD.data,
        changedate = NOW(); 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `new_table1`
--

DROP TABLE IF EXISTS `new_table1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `new_table1` (
  `new_table1col` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `resource_audit`
--

DROP TABLE IF EXISTS `resource_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `resource_audit` (
  `record_id` varchar(250) NOT NULL,
  `resp_data` json DEFAULT NULL,
  `changedate` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `resource_data`
--

DROP TABLE IF EXISTS `resource_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `resource_data` (
  `record_id` varchar(25) NOT NULL,
  `resp_data` json DEFAULT NULL,
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_resource_update` BEFORE UPDATE ON `resource_data` FOR EACH ROW BEGIN
    INSERT INTO resource_audit
    SET
    record_id = OLD.record_id,
    resp_data = OLD.resp_data,
	changedate = NOW(); 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `vendor` (
  `vendorName` varchar(255) DEFAULT NULL,
  `contactPerson` varchar(255) DEFAULT NULL,
  `contact` varchar(250) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `scopeOfServices` varchar(255) DEFAULT NULL,
  `newSubmittal` varchar(255) DEFAULT NULL,
  `createdBY` varchar(255) DEFAULT NULL,
  `updatedBY` varchar(255) DEFAULT NULL,
  `createdOn` varchar(200) DEFAULT NULL,
  `updatedOn` varchar(200) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_vendor_update` BEFORE UPDATE ON `vendor` FOR EACH ROW BEGIN
    INSERT INTO audit
    SET action = 'update',
		vendorName = OLD.vendorName,
        contactPerson = OLD.contactPerson,
        contact = OLD.contact,
        email = OLD.email,
        region = OLD.region,
        scopeOfServices = OLD.scopeOfServices,
        newSubmittal = OLD.newSubmittal,
        street = OLD.street,
        city = OLD.city,
        zip = OLD.zip,
        updatedBy = OLD.updatedBy,
        updatedOn = OLD.updatedOn,
        changedat = NOW(); 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'intraedge'
--

--
-- Dumping routines for database 'intraedge'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-19 14:30:17
