-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2018 at 11:21 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hairb2b`
--

-- --------------------------------------------------------

--
-- Table structure for table `trn_busy_date_stylist`
--

CREATE TABLE `trn_busy_date_stylist` (
  `id` int(11) NOT NULL,
  `stylist_id` int(11) NOT NULL,
  `busy_date` date NOT NULL,
  `time_slot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trn_busy_date_stylist`
--

INSERT INTO `trn_busy_date_stylist` (`id`, `stylist_id`, `busy_date`, `time_slot_id`) VALUES
(1, 1, '2018-02-16', 1),
(2, 1, '2018-02-22', 2),
(3, 2, '2018-02-16', 2),
(4, 2, '2018-02-19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `trn_gallery`
--

CREATE TABLE `trn_gallery` (
  `id` int(10) NOT NULL,
  `stylist_id` int(10) NOT NULL,
  `image_path` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `trn_skill`
--

CREATE TABLE `trn_skill` (
  `id` int(10) NOT NULL,
  `stylist_id` int(10) NOT NULL,
  `skill` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trn_skill`
--

INSERT INTO `trn_skill` (`id`, `stylist_id`, `skill`) VALUES
(1, 1, 'Advanced colouring'),
(2, 1, 'Colour correction'),
(3, 2, 'Hair painting'),
(4, 2, 'Bridal');

-- --------------------------------------------------------

--
-- Table structure for table `trn_stylist`
--

CREATE TABLE `trn_stylist` (
  `id` int(10) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `profile_pic` varchar(500) NOT NULL,
  `address_line_1` varchar(500) NOT NULL,
  `address_line_2` varchar(500) NOT NULL,
  `city` varchar(500) NOT NULL,
  `state` varchar(500) NOT NULL,
  `mrng_cost` int(100) NOT NULL,
  `evng_cost` int(100) NOT NULL,
  `telephone` int(10) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `rating` int(10) NOT NULL,
  `terms_and_condotions` varchar(1000) NOT NULL,
  `type_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trn_stylist`
--

INSERT INTO `trn_stylist` (`id`, `first_name`, `last_name`, `profile_pic`, `address_line_1`, `address_line_2`, `city`, `state`, `mrng_cost`, `evng_cost`, `telephone`, `description`, `rating`, `terms_and_condotions`, `type_id`) VALUES
(1, 'Joseph ', 'Charles', './public/images/pro_pic_2.jpg', 'Sydney', '', '', '', 150, 200, 770370315, '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.', 4, '', 2),
(2, 'Glen', 'Maxwell', './public/images/pro_pic_3.jpg', 'Melbourne', '', '', '', 175, 225, 774075978, '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,', 3, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `trn_time_slot`
--

CREATE TABLE `trn_time_slot` (
  `id` int(10) NOT NULL,
  `time_slot` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trn_time_slot`
--

INSERT INTO `trn_time_slot` (`id`, `time_slot`) VALUES
(1, 'Morning'),
(2, 'Evening');

-- --------------------------------------------------------

--
-- Table structure for table `trn_type`
--

CREATE TABLE `trn_type` (
  `id` int(10) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trn_type`
--

INSERT INTO `trn_type` (`id`, `type`) VALUES
(1, 'Educator'),
(2, 'Hairstylist'),
(3, 'Assistant');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `trn_busy_date_stylist`
--
ALTER TABLE `trn_busy_date_stylist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trn_gallery`
--
ALTER TABLE `trn_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trn_skill`
--
ALTER TABLE `trn_skill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trn_stylist`
--
ALTER TABLE `trn_stylist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trn_time_slot`
--
ALTER TABLE `trn_time_slot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trn_type`
--
ALTER TABLE `trn_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `trn_busy_date_stylist`
--
ALTER TABLE `trn_busy_date_stylist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trn_gallery`
--
ALTER TABLE `trn_gallery`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trn_skill`
--
ALTER TABLE `trn_skill`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trn_stylist`
--
ALTER TABLE `trn_stylist`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `trn_time_slot`
--
ALTER TABLE `trn_time_slot`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `trn_type`
--
ALTER TABLE `trn_type`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
