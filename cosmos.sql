-- MySQL dump 10.13  Distrib 5.7.10, for osx10.11 (x86_64)
--
-- Host: localhost    Database: cosmos
-- ------------------------------------------------------
-- Server version	5.7.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Streams`
--

DROP TABLE IF EXISTS `Streams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Streams` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` tinytext,
  `img` text,
  `height` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `url` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Streams`
--

LOCK TABLES `Streams` WRITE;
/*!40000 ALTER TABLE `Streams` DISABLE KEYS */;
INSERT INTO `Streams` VALUES (1,'Earth','http://1.bp.blogspot.com/-nPiepW_h_gg/VY8kj7talsI/AAAAAAAAEzI/Al3vW23hHWQ/s1600/sun-and-earth-18505.jpg',100,160,'http://iphone-streaming.ustream.tv/uhls/9408562/streams/live/iphone/playlist.m3u8'),(2,'Aquarium','http://2.bp.blogspot.com/-sQo4h7WR78Q/VPFpswvS1JI/AAAAAAAAGg4/2KqU3l_nsAE/s1600/aquarium%25252Bscreensaver.jpg',100,160,'http://iphone-streaming.ustream.tv/uhls/14812707/streams/live/iphone/playlist.m3u8'),(3,'Penguins','https://penguinplacepost.files.wordpress.com/2014/12/104111-penguins-lovers-flying-penguin.jpg',100,160,'http://seafl-penguin1.apple.camzonecdn.com/CamzoneStreams/seafl-penguin3/Playlist.m3u8');
/*!40000 ALTER TABLE `Streams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `IP` tinytext,
  `Name` tinytext,
  `img` text,
  `time` tinytext,
  `ping` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'10.0.0.79','Alex','http://www.guidance-center.org/images/Curious%20George.jpg','1475080094527',1),(2,'10.0.0.227','Ian','http://www.how-to-draw-funny-cartoons.com/image-files/cartoon-deer-8.gif','1475075088248',1),(3,'10.0.0.35','Wil','http://www.bluemoonstudios.com/blog/wp-content/uploads/wilbur041.png','1475065835110',1),(4,'10.0.0.104','iPhone?',NULL,NULL,NULL),(5,'10.0.0.196','Michele','http://i.istockimg.com/file_thumbview_approve/73578365/3/stock-illustration-73578365-cartoon-animal-fox-posing.jpg','1474979408674',1),(6,'10.0.0.188','Derrick',NULL,NULL,1),(7,'10.0.0.3','Marty','http://vignette2.wikia.nocookie.net/r__/images/b/bd/Rocky.jpg/revision/latest?cb=20140407183134&path-prefix=rockyandbullwinkle','0',1),(9,'10.0.0.181','Jody','http://www.how-to-draw-funny-cartoons.com/image-files/how-to-draw-a-raccoon-9.gif','1475067951396',1),(10,'10.0.0.96','Jon','http://www.clker.com/cliparts/0/3/2/6/1218784744929957488Martouf_Giraffe_sympa.svg','1475066833833',1),(11,'10.0.0.15','Brent','http://th15.st.depositphotos.com/2195902/4766/v/170/depositphotos_47669495-Badger-isolated-on-white-background.jpg','1472177810986',1),(12,'10.0.0.114','Clint Eastwood','http://orig07.deviantart.net/58c9/f/2009/297/e/c/clint_eastwood_by_scoppetta.jpg','',0),(13,'10.0.0.71','Alex','http://www.guidance-center.org/images/Curious%20George.jpg','',0),(14,'10.0.0.224','Dan',NULL,NULL,0),(15,'10.0.0.103','Jody','http://www.how-to-draw-funny-cartoons.com/image-files/how-to-draw-a-raccoon-9.gif',NULL,0),(16,'10.0.0.86','Ian','http://www.how-to-draw-funny-cartoons.com/image-files/cartoon-deer-8.gif',NULL,0),(17,'10.0.0.54','Bad Dad','http://www.clipartlord.com/wp-content/uploads/2015/12/frog-face2.png','1475079791143',1),(18,'10.0.0.129','Dan',NULL,NULL,0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ledger`
--

DROP TABLE IF EXISTS `ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ledger` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `User` varchar(100) DEFAULT NULL,
  `Date` varchar(100) DEFAULT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `Cost` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ledger`
--

LOCK TABLES `ledger` WRITE;
/*!40000 ALTER TABLE `ledger` DISABLE KEYS */;
INSERT INTO `ledger` VALUES (2,'Alex','2016-07-21T17:41:38.753Z','TV Stand',34),(3,'Jon','2016-07-21T17:41:57.614Z','Electric',255),(4,'Ian','2016-07-21T17:42:04.835Z','Gas',24);
/*!40000 ALTER TABLE `ledger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movies` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` text,
  `url` text,
  `img` text,
  `type` int(1) DEFAULT '0',
  `series` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'28 Days Later','28_Days_Later.mp4','http://image.tmdb.org/t/p/w500/xaYdxi1PBEAYvqknvAmMPK5Eff3.jpg',0,NULL),(2,'A Clockwork Orange','A_Clockwork_Orange.mp4','http://image.tmdb.org/t/p/w500/hJYwfHxh9O7lyF7hTIT7ZoP8FYQ.jpg',0,NULL),(3,'A Goofy Movie','A_Goofy_Movie.mp4','http://image.tmdb.org/t/p/w500/iXYXjKohQ1j2FNIXLa84aaaE76K.jpg',0,NULL),(4,'Cosmos Episode 1','Episode1_Cosmos_A_Spacetime_Odyssey.mkv','http://image.tmdb.org/t/p/w500/jViSxrU3NBvmNsQBpf37sPBmBOq.jpg',1,'Cosmos'),(5,'Cosmos Episode 2','Episode2.mkv','http://image.tmdb.org/t/p/w500/jViSxrU3NBvmNsQBpf37sPBmBOq.jpg',1,'Cosmos'),(6,'Shrek','Shrek.avi','http://image.tmdb.org/t/p/w500/140ewbWv8qHStD3mlBDvvGd0Zvu.jpg',0,NULL),(7,'Willy Wonka','Willy_Wonka.mp4','http://image.tmdb.org/t/p/w500/b94qXd1FcIwgzv0NYMUe2bjrzJR.jpg',0,NULL),(9,'Up','Up.mp4','http://image.tmdb.org/t/p/w500/gfFqBcoFW8uczyl2ytVmVmUg82k.jpg',0,NULL),(10,'Hotel Transylvania','Hotel_Transylvania.mp4','http://image.tmdb.org/t/p/w500/9qugesYpAWHUpdrw2w8URSGkAPt.jpg',0,NULL),(11,'Zombieland','Zombieland.mp4','http://image.tmdb.org/t/p/w500/vUzzDpVrab1BOG3ogxhRGfLN94d.jpg',0,NULL),(13,'The Lego Movie','The_Lego_Movie.mp4','http://image.tmdb.org/t/p/w500/lMHbadNmznKs5vgBAkHxKGHulOa.jpg',0,NULL),(14,'Fantastic Mr. Fox','FantasticMrFox.mp4','http://image.tmdb.org/t/p/w500/750pfEttsYAVmynRg2vmt1AXh4q.jpg',0,NULL),(15,'The Great Gatsby','GreatGatsby.mp4','http://image.tmdb.org/t/p/w500/oJpOYPpVWyPeunGbbDGH1KFvea0.jpg',0,NULL),(16,'Benjamin Button','benjamin_button.mkv','http://image.tmdb.org/t/p/w500/4O4INOPtWTfHq3dd5vYTPV0TCwa.jpg',0,NULL),(22,'Our Stuff','we.bare.bears.s01e01.our.stuff.720p.hdtv.x264-w4f.mkv','http://image.tmdb.org/t/p/w500/cC499yjerLFgs3VNAYBF2alzbTm.jpg',1,'We Bare Bears'),(23,'Viral Video','we.bare.bears.s01e02.viral.video.720p.hdtv.x264-w4f.mkv','http://image.tmdb.org/t/p/w500/cC499yjerLFgs3VNAYBF2alzbTm.jpg',1,'We Bare Bears'),(24,'Food Truck','we.bare.bears.s01e03.food.truck.720p.hdtv.x264-w4f.mkv','http://image.tmdb.org/t/p/w500/cC499yjerLFgs3VNAYBF2alzbTm.jpg',1,'We Bare Bears'),(25,'Chloe Repack','we.bare.bears.s01e04.chloe.repack.720p.hdtv.x264-w4f.mkv','http://image.tmdb.org/t/p/w500/cC499yjerLFgs3VNAYBF2alzbTm.jpg',1,'We Bare Bears'),(26,'Pandas Date','we.bare.bears.s01e05.pandas.date.720p.hdtv.x264-w4f.mkv','http://image.tmdb.org/t/p/w500/cC499yjerLFgs3VNAYBF2alzbTm.jpg',1,'We Bare Bears'),(27,'Everyday Bears','we.bare.bears.s01e06.everyday.bears.720p.hdtv.x264-w4f.mkv','http://image.tmdb.org/t/p/w500/cC499yjerLFgs3VNAYBF2alzbTm.jpg',1,'We Bare Bears'),(28,'Burrito Convert','we.bare.bears.s01e07.burrito.convert.720p.hdtv.x264-w4f.mkv','http://image.tmdb.org/t/p/w500/cC499yjerLFgs3VNAYBF2alzbTm.jpg',1,'We Bare Bears'),(39,'Deadpool','Deadpool.mp4','http://image.tmdb.org/t/p/w500/inVq3FRqcYIRl2la8iZikYYxFNR.jpg',0,NULL),(40,'Pirate Radio','Pirate.Radio.mp4','http://image.tmdb.org/t/p/w500/9yPSnwksl3vcTISI3Jn4zpVSMRA.jpg',0,NULL),(60,'Wildflower','the_was.mp4','http://cdn4.pitchfork.com/albums/23413/b369b595.jpg',1,'The Avalanches');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `message` varchar(54321) DEFAULT NULL,
  `date` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-28 12:31:01
