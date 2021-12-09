-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2021 at 12:32 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bloodbank`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminuser`
--

CREATE TABLE `adminuser` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adminuser`
--

INSERT INTO `adminuser` (`id`, `username`, `email`, `password`, `email_status`) VALUES
(1, 'Kuz', 'kiran.ghimiray098@gmail.com', 'test1234', 'verified'),
(2, 'Ram', 'test123@gmail.com', 'test123', 'verified'),
(4, 'Sam', 'sam@gmail.com', 'test1234', 'verified'),
(5, 'Snoop', 'djsnoop@gmail.com', 'test123', 'verified'),
(6, 'kakashi', 'hatake@gmail.com', 'test123', 'verified');

-- --------------------------------------------------------

--
-- Table structure for table `donor`
--

CREATE TABLE `donor` (
  `donorid` int(11) NOT NULL,
  `donorname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `phone` bigint(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `bloodtype` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donor`
--

INSERT INTO `donor` (`donorid`, `donorname`, `email`, `dob`, `phone`, `gender`, `bloodtype`, `address`) VALUES
(5, 'Shyam', 'shyam@gmail.com', '2021-11-17', 987654321, 'Male', 'O+', 'Lagankhel'),
(6, 'John', 'johndoe@gmail.com', '2021-11-09', 9854336721, 'Male', 'O-', 'Naubise'),
(7, 'Bob', 'bobby@gmail.com', '2021-04-13', 987655544, 'Male', 'B-', 'Pokhara'),
(8, 'Narendra', 'narendra@gmail.com', '1991-10-16', 9844556633, 'Male', 'AB+', 'Kathmandu'),
(9, 'Dan', 'danhendo@gmail.com', '2000-07-14', 985533221, 'Male', 'O+', 'Kathmandu'),
(10, 'Ajay', 'ajaydevgn@gmail.com', '2021-11-03', 987744332, 'Male', 'O+', 'Kathmandu'),
(12, 'Luffy', 'luffydonor@gmail.com', '2021-12-10', 9877110076, 'Male', 'B+', 'Ilam'),
(14, 'Sachin', 'sachinpariyar@gmail.com', '2017-06-14', 9800774431, 'Male', 'O+', 'Lalitpur'),
(15, 'Nikesh', 'nikesh@gmail.com', '2021-12-14', 9877665544, 'Male', 'O+ ', 'Kupandole');

-- --------------------------------------------------------

--
-- Table structure for table `reqstatus`
--

CREATE TABLE `reqstatus` (
  `donorid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `reqstatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reqstatus`
--

INSERT INTO `reqstatus` (`donorid`, `userid`, `reqstatus`) VALUES
(9, 53, 'Approved'),
(10, 53, 'Approved'),
(5, 53, 'Approved'),
(8, 53, 'Approved'),
(6, 53, 'Approved'),
(7, 53, 'Requested'),
(12, 53, 'Declined'),
(10, 53, 'Approved'),
(9, 54, 'Approved'),
(12, 54, 'Approved'),
(10, 54, 'Approved'),
(7, 54, 'Approved'),
(6, 54, 'Declined'),
(6, 54, 'Declined'),
(8, 54, 'Requested'),
(10, 55, 'Approved'),
(14, 54, 'Approved'),
(9, 55, 'Approved'),
(9, 57, 'Approved'),
(9, 60, 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE `temp` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `temp`
--

INSERT INTO `temp` (`id`, `email`, `token`) VALUES
(36, 'karkinishant14@gmail.com', 'bp9zjl1o'),
(39, 'np01cp4a180175@islingtoncollege.edu.np', 'gbx9c079'),
(41, 'kiran.ghimiray098@gmail.com', '17ap9x9y'),
(44, 'abi@gmail.com', 'p4tuoj8i'),
(51, 'kiran098@gmail.com', 'im18usuo'),
(53, 'ashokbaniya421@gmail.com', 'fbjgv5u6'),
(55, 'kamal12neupane@gmail.com', 'f2z2nlsm');

-- --------------------------------------------------------

--
-- Table structure for table `tempadmin`
--

CREATE TABLE `tempadmin` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tempadmin`
--

INSERT INTO `tempadmin` (`id`, `email`, `token`) VALUES
(1, 'kiran.ghimiray098@gmail.com', 'waxu1i5w');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `phone` bigint(20) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `bloodtype` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `emailstatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `email`, `password`, `dob`, `phone`, `gender`, `bloodtype`, `address`, `emailstatus`) VALUES
(45, 'Nish', 'karkinishant14@gmail.com', '$2b$10$Dl85XSNKqxljAEx33oXvR.ymyRoqFo5cWEKZqdR690Sg9MJpC61Hi', '2021-11-15', 9877665544, 'male', 'A-', 'Jagati', 'verified'),
(46, 'Sam', 'sam@gmail.com', '$2b$10$JWKIWThBfULW33aEtt/iOuanjoQjKZf7nj4zvfhi8f0lqa2ibgmLK', '2021-11-09', 9855667743, 'female', 'AB+', 'Kusunti-13', 'not_verified'),
(51, 'Kiran', 'kiran098@gmail.com', '$2b$10$6xOlNknlUYpUsv3uPFHkAOAsnmoSlxYfI1HMfMWs2MMV2s4gsFASy', '2021-11-08', 9843807327, 'female', 'B+', 'Kusunti-13', 'verified'),
(52, 'Karan', 'kiranghimiray098@gmail.com', '$2b$10$rNoVNyjRWy/bfIVr8RFx5u7RXabCgXefYJII52oz9p5ZbKGg49zLK', '2021-11-16', 77886632, 'male', 'O+', 'Bhaisepati', 'verified'),
(53, 'Ashok', 'ashokbaniya421@gmail.com', '$2b$10$015wTibUiVSpcGdcC90pXOSju/s2nx17j7b1V8EOiR8Kzai0X2W2m', '2021-11-09', 9861484062, 'male', 'O+', 'Kalanki', 'verified'),
(54, 'Krishna', 'krishna@gmail.com', '$2b$10$EpAyCVEeCfkLpIGWx/QxuewO/VymzrqmWdCjAMTcMCeMVj/ZeCYIa', '2021-12-07', 9844332267, 'male', 'O+', 'Baneshwori', 'verified'),
(55, 'Kamal', 'kamal12neupane@gmail.com', '$2b$10$hAJ0f23mHKqBTq25evbXVes8u6Maokh5IPng.pyPri5iwOHeIKDRG', '2021-12-06', 9800443321, 'male', 'B+', 'Jamal', 'verified'),
(57, 'Levi', 'leviackerman@gmail.com', '$2b$10$1MRiOlRwJviZnBP.sgTOhO8hoZOUv12o4E1pgK13OpsqRFBHw2h4q', '2021-12-06', 9809654521, 'male', 'B+', 'Japan', 'verified'),
(58, 'Itachi', 'uchihatest@gmail.com', '$2b$10$MKcTN1eXUHAYXoF9xy.9A.ESaw3O0wT8ZdApTSimu12Oy20RNdqS2', '2021-12-07', 9866220034, 'Male', 'B- ', 'Konoha', 'verified'),
(60, 'Prajwal', 'prajwalbati@gmail.com', '$2b$10$.cPL3dx39v7ESxagAVB81.m1PeFmQ/rXl8CFOLU.OwuZVI19BjlXK', '2021-12-20', 98075566321, 'Male', 'B+', 'Kupandole', 'verified');

-- --------------------------------------------------------

--
-- Table structure for table `verify`
--

CREATE TABLE `verify` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `verify`
--

INSERT INTO `verify` (`id`, `username`, `email`, `token`) VALUES
(43, 'Nish', 'karkinishant14@gmail.com', 'ody8ix2t'),
(44, 'Sam', 'sam@gmail.com', 'i8upl4mp'),
(45, 'Gopal', 'gopal@gmail.com', 'xgxff6mg'),
(46, 'Gopal', 'gopal12@gmail.com', '4vkjvk1g'),
(47, 'Gopal', 'gopal1@gmail.com', 'wqb79r4v'),
(48, 'Kiran', 'kiran.ghimiray098@gmail.com', '8mig5stn'),
(49, 'Kiran', 'kiran098@gmail.com', 'nzp7egz7'),
(50, 'Kiran', 'kiranghimiray098@gmail.com', 'gskcl3vg'),
(51, 'Ashok', 'ashokbaniya421@gmail.com', '2jr6lud3'),
(52, 'Krishna', 'krishna@gmail.com', '29rb2tm3'),
(53, 'Kamal', 'kamal12neupane@gmail.com', '9dsr5vuh'),
(54, 'Kamal', 'kamal12neupane@gmail.com', 'ebt5ur24'),
(55, 'Kamal', 'kamal12neupane@gmail.com', 'ym3s8djs'),
(56, 'Kamal', 'kamal12neupane@gmail.com', 'xwpqj6p5'),
(57, 'Kamal', 'kamal12neupane@gmail.com', 'vgam5dg0'),
(58, 'Levi', 'leviackerman@gmail.com', 'ervqou8c'),
(59, 'Itachi', 'uchihatest@gmail.com', 'tdi79al6'),
(60, 'Sita', 'sita@mailinator.com', 'c1qi8r6y'),
(61, 'Prajwal', 'prajwalbati@gmail.com', '5gx7y42y');

-- --------------------------------------------------------

--
-- Table structure for table `verifyadmin`
--

CREATE TABLE `verifyadmin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `verifyadmin`
--

INSERT INTO `verifyadmin` (`id`, `username`, `email`, `token`) VALUES
(1, 'Kuz', 'kiran.ghimiray098@gmail.com', 'b38ufpe2'),
(4, 'Ram', 'test123@gmail.com', '7iift0i4'),
(5, 'Sam', 'sam@gmail.com', '7xp8di12'),
(6, 'Snoop', 'djsnoop@gmail.com', '3u1kgs8t'),
(7, 'kakashi', 'hatake@gmail.com', '2shgf6m3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donor`
--
ALTER TABLE `donor`
  ADD PRIMARY KEY (`donorid`);

--
-- Indexes for table `reqstatus`
--
ALTER TABLE `reqstatus`
  ADD KEY `donorid_fk` (`donorid`),
  ADD KEY `user_id_fk` (`userid`);

--
-- Indexes for table `temp`
--
ALTER TABLE `temp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tempadmin`
--
ALTER TABLE `tempadmin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `verify`
--
ALTER TABLE `verify`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verifyadmin`
--
ALTER TABLE `verifyadmin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminuser`
--
ALTER TABLE `adminuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `donor`
--
ALTER TABLE `donor`
  MODIFY `donorid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `temp`
--
ALTER TABLE `temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `tempadmin`
--
ALTER TABLE `tempadmin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `verify`
--
ALTER TABLE `verify`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `verifyadmin`
--
ALTER TABLE `verifyadmin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reqstatus`
--
ALTER TABLE `reqstatus`
  ADD CONSTRAINT `donorid_fk` FOREIGN KEY (`donorid`) REFERENCES `donor` (`donorid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
