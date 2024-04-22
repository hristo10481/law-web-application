-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2024 at 10:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `consultation`
--

CREATE TABLE `consultation` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `inquiry` varchar(255) NOT NULL,
  `additional_info` text DEFAULT NULL,
  `consent` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultation`
--

INSERT INTO `consultation` (`id`, `name`, `phone`, `email`, `inquiry`, `additional_info`, `consent`) VALUES
(1, 'храстъ', '+359882164927', '', 'legal_advice', 'аббб', 1),
(2, 'храстъааааа', '+359882164927', '', 'legal_advice', 'aaaa', 1),
(3, 'хр', '+359882164927', '', 'legal_advice', 'ааааа', 1),
(4, 'хр', '+359882164927', '', 'legal_advice', 'aaaaa', 1),
(5, 'хр', '+359882164927', '', 'legal_advice', 'aaaa', 1),
(6, 'хр', '+359882164927', '', 'legal_advice', 'ааа', 1),
(7, 'хр', '+359882164927', '', 'legal_advice', 'ааа', 1),
(8, 'хр', '+359882164927', '', 'legal_advice', 'aaaaa', 1),
(9, 'хр', '+359882164927', 'hristokerezov@yahoo.com', 'legal_advice', 'zafasfdsf', 1),
(10, 'Христо', '+359882164927', 'hristokerezov@yahoo.com', 'legal_advice', 'ааа', 1),
(11, 'Христо Керезов', '+359882164927', 'hristokerezov@yahoo.com', 'legal_advice', 'aaaa', 1);

-- --------------------------------------------------------

--
-- Table structure for table `consultationrequest`
--

CREATE TABLE `consultationrequest` (
  `id` int(11) NOT NULL,
  `userId` int(10) UNSIGNED DEFAULT NULL,
  `lawyerId` int(11) DEFAULT NULL,
  `appointmentDateTime` datetime NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultationrequest`
--

INSERT INTO `consultationrequest` (`id`, `userId`, `lawyerId`, `appointmentDateTime`, `status`) VALUES
(27, 22, 1, '2024-04-19 10:05:00', 'declined'),
(28, 24, 1, '2024-04-15 13:30:00', 'approved'),
(29, 22, 5, '2024-04-18 19:15:00', 'approved'),
(30, 22, 1, '2024-04-18 09:26:00', 'approved'),
(31, 22, 1, '2024-04-18 09:32:00', 'declined');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `name`, `path`, `imagePath`, `description`) VALUES
(16, 'ÐÐ»Ð°Ð½ÐºÐ°-ÐÐµÐºÐ»Ð°ÑÐ°ÑÐ¸Ñ-Ð·Ð°-ÑÑÐ³Ð»Ð°ÑÐ¸Ðµ.docx', 'uploads\\document-1713380794671.docx', 'uploads\\documentImage-1713380794672.jpg', 'Декларация за съгласие за обработване на лични данни'),
(17, 'ÐÐ»Ð°Ð½ÐºÐ°-ÐÐÐÐÐÐ ÐÐ¦ÐÐ¯-Ð²ÑÑÑÐµÑÐ½Ð¸-Ð¿ÑÐ°Ð²Ð¸Ð»Ð°.docx', 'uploads\\document-1713380848541.docx', 'uploads\\documentImage-1713380848542.jpg', 'Декларация за съгласие от работник или служител'),
(18, 'law-website-diplom (2).zip', 'uploads\\document-1713432372612.zip', 'uploads\\documentImage-1713432372791.png', 'diploma\r\n'),
(19, '1a.png', 'uploads\\document-1713432713422.png', 'uploads\\documentImage-1713432713423.png', 'qaaaa');

-- --------------------------------------------------------

--
-- Table structure for table `lawyers`
--

CREATE TABLE `lawyers` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `profilePicturePath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lawyers`
--

INSERT INTO `lawyers` (`id`, `firstName`, `lastName`, `email`, `phone`, `specialization`, `profilePicturePath`) VALUES
(1, 'Христо', 'Керезов', 'hristokerezov@yahoo.com', '+359882164927', 'Търговско право', NULL),
(5, 'Биляна', 'Керезова', 'bilyanakerezova@yahoo.com', '+359882174927', 'Недвижими имоти', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `imageUrl`) VALUES
(1, '', '', NULL),
(2, '', '', NULL),
(4, 'aa', 'aa', NULL),
(5, 'aaa', 'aaa', 'public\\uploads\\imageFile-1711579447445.jpg'),
(6, 'aa', 'aa', 'public\\uploads\\imageFile-1711580264899.jpg'),
(7, '123', '123', 'public\\uploads\\imageFile-1711580417796.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `profile_picture_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `first_name`, `last_name`, `email`, `phone_number`, `profile_picture_path`) VALUES
(11, 22, 'Христо', 'Керезов', 'hristokerezov@yahoo.com', '+359882164927', NULL),
(12, 23, 'Hristo', 'Kerezov', 'hristokerezov2005@yahoo.com', '+359882164927', NULL),
(13, 24, 'Грозделина', 'Керезова', 'gkerezova@yahoo.com', '+359882222305', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `email`) VALUES
(6, 'hristokerezov@yahoo.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `Email`, `role`) VALUES
(22, 'hristo10481', '$2a$10$.yU/DLaIYCp0BqSOrP4.ZuhnadazVe4mjIjsP3sBuMo30qWjNu.qC', 'hristokerezov@yahoo.com', 'admin'),
(23, 'hristokerezov', '$2a$10$ffIvT6Swt3ATAqq/FPdLt.1y2T7r7ouDfCO33S20bJWT1d8qCeYSu', 'hristokerezov2005@yahoo.com', 'user'),
(24, 'hristo104811', '$2a$10$ZIAV6q70EaFCHLCRm.R6DOEWOt8iPBIwluKs0C/l9fgE1rK1WtoaO', 'gkerezova@yahoo.com', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `consultation`
--
ALTER TABLE `consultation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consultationrequest`
--
ALTER TABLE `consultationrequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_consultationrequest_lawyer` (`lawyerId`),
  ADD KEY `fk_consultationrequest_user` (`userId`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lawyers`
--
ALTER TABLE `lawyers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id_UNIQUE` (`user_id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `consultation`
--
ALTER TABLE `consultation`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `consultationrequest`
--
ALTER TABLE `consultationrequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `lawyers`
--
ALTER TABLE `lawyers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `consultationrequest`
--
ALTER TABLE `consultationrequest`
  ADD CONSTRAINT `fk_consultationrequest_lawyer` FOREIGN KEY (`lawyerId`) REFERENCES `lawyers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_consultationrequest_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_lawyerId` FOREIGN KEY (`lawyerId`) REFERENCES `lawyers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `fk_user_profile` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
