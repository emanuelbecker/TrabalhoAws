-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: barbearia
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agendamentos`
--

DROP TABLE IF EXISTS `agendamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_id` int(11) DEFAULT NULL,
  `barbeiro_id` int(11) NOT NULL,
  `servico_id` int(11) NOT NULL,
  `data_agendada` date NOT NULL,
  `hora_agendada` time DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT 0,
  `cancelado` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_agendamento` (`barbeiro_id`,`data_agendada`,`hora_agendada`),
  KEY `fk_agendamento_cliente` (`cliente_id`),
  KEY `fk_agendamento_servico` (`servico_id`),
  CONSTRAINT `fk_agendamento_barbeiro` FOREIGN KEY (`barbeiro_id`) REFERENCES `barbeiros` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_agendamento_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_agendamento_servico` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamentos`
--

LOCK TABLES `agendamentos` WRITE;
/*!40000 ALTER TABLE `agendamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `agendamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barbeiros`
--

DROP TABLE IF EXISTS `barbeiros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barbeiros` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `img` blob DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barbeiros`
--

LOCK TABLES `barbeiros` WRITE;
/*!40000 ALTER TABLE `barbeiros` DISABLE KEYS */;
INSERT INTO `barbeiros` VALUES (1,'Luiz Henrique Vargas',_binary 'ÿ\Øÿ\à\0JFIF\0\0\0\0\0\0ÿ\í\0„Photoshop 3.0\08BIM\0\0\0\0\0h(\0bFBMD0a000ad2010000de030000920600000107000095070000f90900002a0f0000840f00000e10000097100000df160000\0ÿ\Û\0„\0\r\r\r\r\r\r\n\n		\n\n\n		\n\n	\n	\n	\r\n\n\r\r\r\r\n\n\r\r\rœÿ\Â\0\0–\0–\"\0ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0!1 \"#A3a$2Qq¡±\ñ\0\0\0\0\0\0\0\0!1 AQaq\"2‘¡±RÁ\Ñ\á\ğBbr‚#0’\0\0\0\0\0\0\0\0!1AQaq‘¡±Á\Ñ\ğ\á\ñ ÿ\Ú\0\0\0\0\0\0¼,Áş\Ë&ç›¾M¼-#QšG\Z/N{kK\Ò‘³\ÙU¬Ğ’-eZ_OV\ÔÈ¬	\é<\ÙD›(ş\ç‹8\ò{¢Á\Î\"R\Ñ4YC@c±¸Rµ\"XÌ¹\rŠie“µUşTT\çg€h¤$a%\ğp¹6Txü Ù\Ş\Ø\ÈÒm‰W\ç·«\óL\Û)4*Üªk\Òş~;z¬N¯^JBƒhµ¹áš®N	›V¡˜¹Ï›¥›¥#_\Ä4º½W<<°G;\Ş0\çc6`£z®Ÿ›\Ówù„/*À\ßÀu\è\íÁ4‚…¹’73}—^\Ø\ñ\n8\Ôo.À\Ïe˜a|OsC?Mé¥¼/q²tœ½‘¸$(\ŞÁcp6)\Âÿ\0K°]¯?&wµù{ùr²¦&®2$Ö«5\Ê6%n¢E¨ª}–IN—eje£\0&Ï¯36(c\"zÎ†d¾\ö\ÜSÒ™•)Ú¿\Z\à=®j¾hf{lŞ‘;-\Ñ\İús¼H\Ô+\Ş\Øæº²·g*\í\õH\Å:w3T×£z£Ú½kœu˜_Á\è\ôN|\æµc\÷½v\İ\ò·¬SÔ¯+À\0\æh\Ç/\Ùj\ôŠµ\Èfo.\ÊÔªÄµ´[\çŞš\'f\ğ¤ø½€\öH\ä±~†ÔŒ\í\ö•a—8Hˆv\Ãy+ºÇ¡\÷$2)\ô\æ·O|¾¬x\æ8\ÛÁ>\Ç\Üd£\ŞNC\'Z\ó\Ù\Ëûf¼½y\ï˜\ö?\Şzÿ\Ú\0\0¦‘\Åwj:­NÒŸNÇ§\ô\àF\ö£\n:r\ó#i\ãT\ï$®\é]Â™.”\÷\ê\\£\Z£	£\ã\×\ÛtÎ™²PSDª\Úbm=4‡N\Ç!8‚ƒPjÒ„x.TMM\ÙB¢#…šB*h\õ&\Î\Òø¤qsx(„adTcp\È\ê	\õS\Äid3FÖ£\É\âR\"x—SŸR#]Á\äò©¸s2x<\0zw\â	È•R\æµ\Ğ\È\Ö6¾³º\öUœz·ª~¢\æ&<8Zb¡¾\'eÓ¬eT·Kúg\â\nC/Qb«‘\Ò\È\ä\Ö\å60´¬\í\Ójp\ìÚ ¦;\İL\ï|ÿ\0Í¯J~©L?®˜i“r\Ê)£\éP\ĞC\Z¬‹¶q\ÒX\ìú“Hcµ*”Ó½)\÷\Ö=É£&†7\Î#b\õ8Z‰Su‚z“ƒªú—p¦\İQS™Q¦.Š6›™h£bk´KY—8\Ä\äÈ´“3Ü™3£kªÀ]\çµTTE7+ƒd\ß5xøºQ:_\Ïx8TJ\\\ê¸KâŠ˜†\ö!SJ)\Ø\÷\ê8%K‹\á4\å\Õ3°ú\à\é\ï@‘zw1Œ¨ÀU4V£R\÷.W\Ä\Ä\é\n•\Äø2\Í\Ø\Ì\ï\áºg¶=I³64ú\ÒS\æs\ï¹w\õ´¸¬.5 VP+R£\÷\Èø´\Å8§°EÀ\'T\'H\\¢“C[ÃŠ\'\È(\'2	5\Çmh\ÈQ³FI±D/Lt\Ø[+•Aø”mÊ‚¦\0½-<\Ê^’\ğ…Ğ¡n9qEFÜªVb:ˆ»o¶PM]9¤E„Ì¬d¶™\ÈMQ\nmk\ä3\ícsh‚hÀ\ê\ô\ö6L1\ZwµQ¹±\á©)X\ôü±C¹6¢§\ÔTĞ‰\ZnTC\rÕ…1\Ûª\Z\Ò5!\Èl¦p\Ì#¤£2¦´4,*ø\Är¡jX»XU…I-^´\öšİ¢T” œXu‘\ó [•ED)ÅºIŠ_ÿ\Ú\0\0?Åš\ÂQ>ÂŸpB—a\â<#´\íÿ\0T²\êúç•¥„l#.!9+\Ø>Ô¸\Î\È7(Œsg\ršœÅ…\Ü `l²OİŠ€û‚”n‚\Ê.¶P(¢™\ÈR\ó\ä.§u«;¬¬£q\àlO\ò6#f\ßÿ\Ú\0\0?<V´‹\Â%cÀ\ğŠ#9K\Ên\çIş‚²Ÿ[¿øúQ³k¸Jx\Í\É\å²š\ğÓ’Œ\Ù\à/qúQ~\Ñv’³)„\ê~xÿ\0I\ÏÕ„`œ\Ö\Ã\ê\ÌS·dÃ²(„\Öm´á€M*^8\òu‚\ÆQIX@,Y\ÈX#\ÉMg\í\Ö\"›`P@Ù\çûYÈ¡g[+ÿ\Ú\0?=\â‰Ø¡^U…wOš·•dÁW´ˆ\ÅûBa\Úc\Z=\ò_,]}+²!€¢º¹q X{7~\ÓÎš\'\ÉCˆ\Î9\Ê.J9t9!\ä¡?\nÃª ‹z£şŠ.R\î–?%„\Ä\ç\ÍbŠ\òƒø\Ëmˆu\Ø&6‹U|ı\n<ŒªYw#xX\ÖÓƒ”ƒ\ê¶\n–N¼Ea\õ@Šƒ/9\î*~\Ø0S\Â\é8OrŞ«‘i\ì™\ä\Ï^T\óûO´V\çsA|<S\ãqdy™C5\ÕQxZ{®\ôbU*Ø\ä¬p\Äp‹\ÃO}¤W@¡z}‚¥dæ¢y \Ö\Ô\ì¼ø\Õw@‡d\ä²\î¼C{y Á€\ê°Áá«¼¸­¡\ß\è†p°\ãb£\ÙÄµ¥|GU\Õ€xI¡/dZ<<(ŒQb\è\Èbz\ì¼T\âÊ±t\Ò|\Ój, 1Z\×\ÂTO¡i;†\Ül€‚b§˜Pşƒ\ğ\é\Å	˜µ\Ğ\"Jß‚AF\×Âò¡¥0\â\Å\r6\óC\ÃM\à²\ï_‚ \óW\ò¤¼8\Ï: pˆ\Z\ÌK\ä\ç\'Q·Âº™>8¢<>§\è­ÿ\0]\ó\ëOERO\æ\Ó+ƒU@»ÈµF‡6şH\Â?*ªµ\ó3ª U*.9h˜\ÓŒ¡\ã“l’\Ç8\ë607U\İ8O\ò]Ø„^Ÿe\ŞV¹aQC±\Ì8’DšWªÕ¼Â€\0\×GQÚ†@6vŸ\Ôü³v\ÄL•\Ë\ÚU‡¨¡]´\"°\ÃO3\î¹	¿\é²Š¨\Í\0=¦\ğ—\å\óUAr]¸ø£„£\'4ƒß’ai\Ç6!‡s\é0œ-Œ¨\ïdÛ¢»Õ #/\õ7ˆ\Üü„\ÃT`·R¿ÿ\Ú\0?!\Zd„Sº¨!\ôŒp¹\Ü YTÈœ\Ğ\ò%\\i!È•[x\Ïà¨ƒT-XøB\0¸˜nùO$‚¯PAÑ¸Y\ã²q%@;\Êt\äĞÀd€‚‹\ìS‚Ô!\0a\Ù¬\\\Zwªÿ\0=?U\Ü\òªs™Îª\rŒ€nÊ§\'\Û\ôsEZ%ÖŠz¨ZŒQ\n—\óU \÷Ò™ú€‰¢0ú…\0.™#¸b™S#\â=\à\r…†Á^\ä£%ûSfT…/ü\0`Š‰ƒ\ß\ğ¨rhQH\Ô\Î]ªc\ğ¢(\è9¢T‹‘Ñ†\ËÚ›\n\012\Û\óeœ`‚\Ï5üSm\ìfJ%=TÁ6:ú¸3\ê\é\Z\ò\ô\á\Ój„y\ì\ö*s™:ß¦½¿}\0Q6& w(º€WKd5Ï¥Pn	ùü2¯¡øso¤d\ì\nd\é–\í\òš\îú+¼EQ[\0‹;3|0‚\á\×@¹\ÊaO¾—Ê€üœ\0\ËAc\ö“€pŠ˜\Î=Ÿºl^b\'`	&x\ÃtW3Jœ=(j\ò0„†\âxSD–sD×¸zM—B{uxû(¾M`GuB‘¾¤¥‘#\öLŠÁ\Û4@M\"^‚U4C1ú\"‹Šü¬†G€Àpü”¸90n“?…S¦;£\0‚\Ò¨\nm&ø>.ƒ\"\\/—ÂŒ¹1\ÚW]\Ğ\ŞQ\î \æ\Ó\Â\"`¹0Õ“. &ş@\nu(\ÒÛ \0°	$–\ò™LUs\å\Ñd&L’\"øC \ä\Æ*1\õ_(\"\0Ùº–ª~‚\çÂ¬\Å\à‹Î®I€A\0o.¥\Ë\á	$p‡\Òh˜\Ùÿ\0ˆH¨$AD>J3@³`£D\È\Ñ\Ğ\Êd«©\Â9ª±1\0Ğ—†¢Ù°\Å{ÚDwE\nj\Zmø£Œ+A4fXjR\È(`\ö1\ô\Ñ\ò§\Ë\Úx:F¡\nÏ´}ı$œ±ª(\Ğ:U\É|\ÕnMY\ZLh\Ô:a\É.J0\ìfs¢Hd‰\ÑY… ˜‹¨P³T\08¶n·‚ºü\0‰\ğE¡‚,Ca¤@€ª\ÚS \n‰w‘\á\0\Üı…9Bù\Ë\à}«\ä~\nc#CsNJrW\Ù\ÉO…) I/\Â \ä-P(ª@\é\Ñj0A€ŒOV;„˜/7	®{\"†S¢ƒ\ä\Ä\öN	€@!\Â\"O`Œ\à\0¯£ı^\Æ2Q\"¢8·´,„—Û©³¦eH	Øƒøu\'€6BÀ‘\ç¨\à_,«\Ñ]\0¾\Øı/DY@«e¯y\ê Õ£s\Ñ\Ğ!FŠ¦1 Ëµt\êw`”DF¨úpUt¡-\Ê\0\ÔQ€4\âq\àp	-Ñº)a\å\Ât 7—\îı\ö`P°ıp=\Ê4f\Å\ä\áLÁŸÏ’\Ìù¢’$Z\ï‹ Zß¬\énG<Ÿ¤b\×[c#\ÇGe$J=\Ó\ÉMOa+\rÓŒ\0t\ÍÀ\0´\Ót6\íAO6.0\Ê3BcB8x\ã=tÁˆ4GB\Ú-Wy	ºLÉ„\Í\ó„6j\ò¡(§(\Z½‰1KHR\àv~BB6`\òh*œ‘d\÷	& \èQ„b^Xû\é@ƒ\ö=IC¤8&F‚f\ó2«h¨l·¤\Î(\íd6NÕŠƒû\Ê,„£Ppˆ\0Ø›5\Â\ÆÁh‘Ed¾²n‡h€l\á\Ëh\ô\Ñ7@F\Ç²O„.ª‚\0f2c¢\æ‡\éqş©\Î½‹jşˆ\Ünøj&a‚\ãVœ\áCNt\Z¥ÿ\0#\Ònƒ€2Y`›\ö[\Ú\à JQÿ\Ú\0\0\0‡9\ã¸ÿ\0\ì¶7¬(‚j	\ëßÌš©”Âšƒ‚&‹¤=ipˆ\\|3Mr	 \ö€§Á§ŸeNda^D\æ«3\\ Cƒ\r4¢ÿ\Ú\0?\Õ3!\Ï\ì™D\÷@\ä\óº\"…\0>‡\î\ç\àü*‰¡š,S®\Í^Á·\İhY¹TĞ¨[&B†FÌ¥m.K˜<—ßš#XU\Ú\à‚\0b\íµÖ¥\ín+‘z\ÜXG®H5\Ó0¥9*†`šuWBBE˜\è‚\ä\ÌdU\0rG!\Ó+¢šC+d·+ÿ\Ú\0?R†\ÄD6­!›&\à‹¦A\äU­¢#Š a;d\n1r\n344¢\á\0Î«SQY\Ï\ÓUvl[¥tD\äˆ<¶¨+…“*²G›şp`9F r ¾h€\\	\ÎP\å$%`±M’6¢\Ó#1å«˜ˆ\Â\É’„V¤\n’êŒŒ:’¾h”*ÿ\Ú\0?šV%5	ë¨ƒ¡j N†Èª§o¤I\r\õ^VŒ\Ó<C¸EY8€ƒ\åšX°*L\å€Z	\Ñe\Å]\ÕX±\0\ê\än„\ÂØ\Ã\Ò8»‹‚‚‚\Í\Ï\ó‘–Qk#Eı\ÄKbYÀ´\İ]j‘\ìY\İÈ’D6~»·¤r’nEiìŒ‰Tt\æ™\0{†Q\çI,Î¨\Âa…\ös¸¢\Õ†\Ä,IPıU\ê°\ã!•ªI\Â\Ë\ğ+¸\î’P.\ê”ú¾À»*ŒŒ\Ú“½\Ów¨§D£û\ğ²‘\ÖH>\Ò{uP“8/\á{_!\ç\ÂIEşH‚˜%~C\Ü\0\ÖL0É’\É\ë¤#\Â4À@uÁ(Æ‡RÁ\Z:\'z\İA\ä+·bgUMkX]¬\ÕD9xct=!\'}¡\íğ´ˆ¥gº$|AH	3\ì\à…[\Ö(a:Cª¾[¡•£zæ¤»\rj‡7\Êü&\ï$\"£„\ßZ”M¬\ÑÁ³$ü\Âx? µHL´@\áÁ¢.,†\ÄeÓ‡6Hr$\Ò0¹4\\…Å“XdÌ¡\òª\r\Õ\ÔFDš\íx ”\n‘\Æ(£€°KKå°#—F\\‰#	¹­t@\÷c\ñemˆ :‚„\ì™Æ£ }\'p\öµ\ôr\á\ä¨¦JhÄ”\áOc&^Y\È!Y³\äA5k@†\Ì\ÈN\ÔÀ¸†øR@f¹Š*P•—”\ê­\æ*\ì°„\öµ\î<-;\ãù#\òıQÑ¾\0„ú$‰K	,†\\rIs¹ª!(t\íG\È4\Ãd\åE,¨-Ëµ	\é6!Â‘\ñ_\Ö@\ô»À_¶ºú¸ùM`0Š\Ê\Zbk$H3G\Øl%\ÇL€<\n—O\Ó\â_3>\É\Ü¬À\Ä©B™\Ã\òÀ\Ü\Ú/¤c\Ú/u› v¨v]²%-‘Ğ-j?@pº¹°AV:\n³\rƒÀ\à!‹_‰l1Jª³Z$¡“\Ûş\Â?\no|X\0¢7œ¯#>´V\nÀî›Šd„0 «\ò0´`\õCs‰	]?`¤!CV\Å8\÷oRĞ­b‚\"d\Ù5\á\ĞFMª}•_w\ä ü8U\ê\èBh^4w;š4†\è\æ\nı\"SY#\Üe\Æ:\Ğhr=ş™\Ç	²˜ 6Á8/	ş“|\Èp04ºªXE?\ÈGp(±?” ø†\á4QO\Â\ä:’“xy&\î\n\ÅùR¦€É»k-¨s\÷B\Èw~²˜L¥£\É\r°@\Ç\ák £Á$\Ø\Î\ó\Ôg\'(gL3\Å\ÉNŠ§A5N\Ù\ğ¦3t\Õ\n7\ğN\èQ9¡/=IÀ„\ê\Ö.”koPI#F\Ô\å{ƒ”F%ÿ\0xŠ¡†Ã³\Â%\ÏH|Pš\î\àr‡Q›[R\ìƒúl<\âD\ê¥\Ú µzÁe› \"» ¢Ô¨\àƒ…‰yO5š`øL .\Î\öci\Ú\ØEDŸ\\tH\îµ\â¨\ìøO•P\Â8cª@û?;OŞ:³“üºiEd x(\ôv+Ò¦­N„‘„‹@Op`\ê !©5_^ûUC9rO%\à \"\Ô{F=d\İ\Û\á\0\Æ\Â5‘	U-%©\ÊTA—hNš\Ü8@\×;‚\'gæŒŒ\ÆQB`3ƒ‡6\İZbn«\ğ2\0\æ…dT\á\'\í8.!)v|\Êv¬\÷!dF\İ0¡f~¦\Ä¹\Ş\æ!\ô\n‡\×E#‡0gØ…T6ˆrD³„.\ì,\Ã,¹v}/Àaº8z\ÔÁ\÷SU=Ù dÃ©Š!\0dj…<Q)\Æ\å3$û \ã\Úp_CpDGÏ—V[fTc \Ë\í}USr“\è)X¨¹O\ç\Âzı\ô\Ê\Ú	haCp\0/ 0%uf@h+\Â\êMn…\ß¨Z²T#œ\ô²¬›ı¨qhûN§„\Íü„8½^G¹\õ\"\îMp\î\\#Ä„\Ì/\à†\r%\\	–\ï\ÕL?µ\0\åZN:\ëŒ’š\Ğ5(\Å`P\Õ7\è j+&ˆ«\Ò\ê ‘°\Ê\ğ\ò\0`\ÛD\ò\r\ÊkÜ¨Qr\0\0\æ\õ]´\'S¸¶\åû‚§\Æ*˜­fîµ•~\È\Ü pqÚ–\Z®€€\00@€\r(ƒ…[k f‚/N€)B‡q,¥d:¸¦\å&À#º•r\Ş\Îÿ\Ù');
/*!40000 ALTER TABLE `barbeiros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disponibilidades`
--

DROP TABLE IF EXISTS `disponibilidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disponibilidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barbeiro_id` int(11) NOT NULL,
  `dia_semana` tinyint(4) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fim` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_disponibilidade_barbeiro` (`barbeiro_id`),
  CONSTRAINT `fk_disponibilidade_barbeiro` FOREIGN KEY (`barbeiro_id`) REFERENCES `barbeiros` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disponibilidades`
--

LOCK TABLES `disponibilidades` WRITE;
/*!40000 ALTER TABLE `disponibilidades` DISABLE KEYS */;
/*!40000 ALTER TABLE `disponibilidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicos`
--

DROP TABLE IF EXISTS `servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicos`
--

LOCK TABLES `servicos` WRITE;
/*!40000 ALTER TABLE `servicos` DISABLE KEYS */;
INSERT INTO `servicos` VALUES (1,'Cabelo','Corte de Cabelo',40.00),(2,'Barba','Corte de Barba',25.00);
/*!40000 ALTER TABLE `servicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'barbearia'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-05 19:18:03
