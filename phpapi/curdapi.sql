-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2018 at 03:02 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `curdapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `p_name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `p_price` int(15) NOT NULL,
  `p_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `address` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `phone` int(10) NOT NULL,
  `pincode` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emailusers`
--

CREATE TABLE `emailusers` (
  `user_id` int(11) NOT NULL,
  `email` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feed`
--

CREATE TABLE `feed` (
  `feed_id` int(11) NOT NULL,
  `feed` text COLLATE utf8_unicode_ci,
  `user_id_fk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `feed`
--

INSERT INTO `feed` (`feed_id`, `feed`, `user_id_fk`) VALUES
(1, 'Every application starts out with what seems like a simple task: get data, transform them, and show them to users. Getting data could be as simple as creating a local variable or as complex as streaming data over a WebSocket.', 1),
(2, 'Once data arrive, you could push their raw toString values directly to the view, but that rarely makes for a good user experience. For example, in most use cases, users prefer to see a date in a simple format like April 15, 1988 rather than the raw string format Fri Apr 15 1988 00:00:00 GMT-0700 (Pacific Daylight Time).', 2),
(3, 'Once data arrive, you could push their raw toString values directly to the view, but that rarely makes for a good user experience. For example, in most use cases, users prefer to see a date in a simple format like April 15, 1988 rather than the raw string format Fri Apr 15 1988 00:00:00 GMT-0700 (Pacific Daylight Time).', 1);

-- --------------------------------------------------------

--
-- Table structure for table `imagesdata`
--

CREATE TABLE `imagesdata` (
  `img_id` int(11) NOT NULL,
  `b64` text COLLATE utf8_unicode_ci,
  `user_id_fk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `delivery` text COLLATE utf8_unicode_ci NOT NULL,
  `p_name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `p_price` int(10) NOT NULL,
  `p_available` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `p_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` longtext NOT NULL,
  `product_manufacturer` longtext NOT NULL,
  `product_sn` longtext NOT NULL,
  `product_tags` longtext NOT NULL,
  `product_description` longtext NOT NULL,
  `product_price` varchar(200) NOT NULL,
  `product_tax` varchar(50) NOT NULL,
  `product_quantity` varchar(50) NOT NULL,
  `product_sku` varchar(100) NOT NULL,
  `product_image` longtext NOT NULL,
  `product_active` varchar(10) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_manufacturer`, `product_sn`, `product_tags`, `product_description`, `product_price`, `product_tax`, `product_quantity`, `product_sku`, `product_image`, `product_active`, `created`) VALUES
(1, 'Tata Salt, 1kg', 'Manufacture', '78455SDFS', 'lte,quad_hd,android_5,64gb', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam necessitatibus suscipit velit voluptatibus! Ab accusamus ad adipisci alias aliquid at atque consectetur, dicta dignissimos, distinctio dolores esse fugiat iste laborum libero magni maiores maxime modi nemo neque, nesciunt nisi nulla optio placeat quas quia quibusdam quis saepe sit ullam!', '18', '18', '120', '4319572394', 'https://images-na.ssl-images-amazon.com/images/I/51rya9i-ufL.jpg', 'on', '2018-10-10 04:57:25'),
(2, 'Agro Fresh Premium Sooji Rawa, 500g', 'New Manufacture', 'NSN', 'lte,quad_hd,android_5,64gb', 'Agro Fresh believes that our reputation must be based on the quality of our products. We have travelled across the country to handpick the finest quality products at the best possible rates.', '40.00', '18', '120', '4319572394', 'https://images-na.ssl-images-amazon.com/images/I/91fxw8UaWPL._SL1500_.jpg', 'on', '2018-10-10 05:01:40'),
(3, 'Dettol Original Soap,BUY 3 GET 1 FREE Dettol Original Soap, 125g', 'Manf', '5656', 'lte,quad_hd,android_5,64gb', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam necessitatibus suscipit velit voluptatibus! Ab accusamus ad adipisci alias aliquid at atque consectetur, dicta dignissimos, distinctio dolores esse fugiat iste laborum libero magni maiores maxime modi nemo neque, nesciunt nisi nulla optio placeat quas quia quibusdam quis saepe sit ullam!', '130.00', '18', '120', '4319572394', 'https://images-na.ssl-images-amazon.com/images/I/61tIX-YbEvL._SL1000_.jpg', 'on', '2018-10-10 08:00:21'),
(4, 'New', 'Manf', '5656', 'lte,quad_hd,android_5,64gb', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam necessitatibus suscipit velit voluptatibus! Ab accusamus ad adipisci alias aliquid at atque consectetur, dicta dignissimos, distinctio dolores esse fugiat iste laborum libero magni maiores maxime modi nemo neque, nesciunt nisi nulla optio placeat quas quia quibusdam quis saepe sit ullam!', '40.00', '18', '120', '4319572394', 'https://images-na.ssl-images-amazon.com/images/I/51rya9i-ufL.jpg', 'on', '2018-10-10 08:01:04'),
(5, 'Product 1', 'Product 1', '56565', 'lte,quad_hd,android_5,64gb', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam necessitatibus suscipit velit voluptatibus! Ab accusamus ad adipisci alias aliquid at atque consectetur, dicta dignissimos, distinctio dolores esse fugiat iste laborum libero magni maiores maxime modi nemo neque, nesciunt nisi nulla optio placeat quas quia quibusdam quis saepe sit ullam!', '30.00', '18', '120', '4319572394', 'https://images-na.ssl-images-amazon.com/images/I/51rya9i-ufL.jpg', 'on', '2018-10-10 08:07:49'),
(6, 'P', 'Rrer', '5', 'lte,quad_hd,android_5,64gb', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam necessitatibus suscipit velit voluptatibus! Ab accusamus ad adipisci alias aliquid at atque consectetur, dicta dignissimos, distinctio dolores esse fugiat iste laborum libero magni maiores maxime modi nemo neque, nesciunt nisi nulla optio placeat quas quia quibusdam quis saepe sit ullam!', '40.00', '18', '120', '4319572394', 'https://images-na.ssl-images-amazon.com/images/I/51rya9i-ufL.jpg', 'on', '2018-10-10 08:09:24');

-- --------------------------------------------------------

--
-- Table structure for table `product_varient`
--

CREATE TABLE `product_varient` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `in_stock` varchar(10) NOT NULL,
  `qty_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_varient`
--

INSERT INTO `product_varient` (`id`, `product_id`, `qty`, `in_stock`, `qty_price`) VALUES
(1, 1, 50, 'on', 100),
(2, 1, 100, 'on', 200),
(3, 2, 10, 'on', 500),
(4, 2, 20, 'on', 1000),
(5, 5, 1, 'on', 155),
(6, 5, 2, 'on', 556),
(7, 6, 55, 'on', 56),
(8, 6, 1, 'on', 4);

-- --------------------------------------------------------

--
-- Table structure for table `technologies`
--

CREATE TABLE `technologies` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `technologies`
--

INSERT INTO `technologies` (`id`, `name`, `description`) VALUES
(7, 'Php', 'I love Php'),
(8, 'Ionic', 'I love Ionic'),
(9, 'Angular -2', 'I love Angular'),
(10, 'Hi', 'Jdjdd'),
(11, 'Himm', 'Nssnsn');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `name`, `email`) VALUES
(1, 'test', '29d75d258e03dc8758382d6bd793414670860125c848861224d1e8cc0e2899c6', 'test', 'test@gmail.com'),
(21, 'vijay', '06dbd4520b81bac1efe9459edf533836e6b55f1c76c1d495cae2db7deff35f80', 'vijay', 'vijay@gmail.com'),
(22, 'karugianni', '1718c24b10aeb8099e3fc44960ab6949ab76a267352459f203ea1036bec382c2', 'Konstantinos Kariyiannis', 'ntinos@kaizershop.gr'),
(24, 'uday', 'c4230aa394938a8c70de6b13b764f384d733d687dba51bd1f170be036e841ff6', 'uday', 'uday@gmail.com'),
(25, 'mrtest', '76acd0eabadf7d39e6842825f17f32cc7fe56e9f289a9d14a3e1fbb215d7af78', 'Mrtest', 'mrtest@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`p_id`) USING BTREE;

--
-- Indexes for table `emailusers`
--
ALTER TABLE `emailusers`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `feed`
--
ALTER TABLE `feed`
  ADD PRIMARY KEY (`feed_id`);

--
-- Indexes for table `imagesdata`
--
ALTER TABLE `imagesdata`
  ADD PRIMARY KEY (`img_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_varient`
--
ALTER TABLE `product_varient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `technologies`
--
ALTER TABLE `technologies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `emailusers`
--
ALTER TABLE `emailusers`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `feed`
--
ALTER TABLE `feed`
  MODIFY `feed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `imagesdata`
--
ALTER TABLE `imagesdata`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `product_varient`
--
ALTER TABLE `product_varient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `technologies`
--
ALTER TABLE `technologies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
