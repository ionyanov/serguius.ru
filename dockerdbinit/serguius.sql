SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `Category` (
  `id` int NOT NULL,
  `created` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL,
  `parCategoryId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Category` (`id`, `created`, `updated`, `name`, `link`, `visible`, `order`, `parCategoryId`) VALUES
(1, '2023-10-14 17:34:39.674', '2023-12-23 16:52:32.096', 'Life', 'life', 1, 0, NULL),
(2, '2023-10-14 17:34:53.268', '2023-12-23 16:52:32.097', 'Graphics', 'graphics', 1, 1, NULL),
(3, '2023-10-14 17:35:07.462', '2023-12-23 16:52:32.097', 'Murals', 'murals', 1, 2, NULL),
(4, '2023-10-14 17:35:36.089', '2023-10-14 17:35:36.089', 'Wood', 'wood', 1, 0, 3),
(5, '2023-10-14 17:35:51.540', '2023-10-14 17:35:51.540', 'Indian', 'indian', 1, 1, 3);

CREATE TABLE `Logs` (
  `id` int NOT NULL,
  `created` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `type` enum('ERROR','INFO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'INFO',
  `message` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Picture` (
  `id` int NOT NULL,
  `created` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `link` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `material` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryId` int NOT NULL,
  `size` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Picture` (`id`, `created`, `updated`, `link`, `name`, `date`, `material`, `categoryId`, `size`) VALUES
(13, '2023-10-14 19:10:42.305', '2023-12-23 16:53:10.661', 'd571c8hc081055262c9i5.jpg', 'Sacura', '2007', '', 4, NULL),
(16, '2023-10-14 19:12:21.193', '2023-12-23 16:53:31.497', 'jj1i10413c06fafhi8bj0.jpg', 'Main view', '', '', 5, NULL),
(19, '2023-10-14 19:14:53.121', '2023-12-23 16:51:43.142', 'hh57573a891136de941j.jpg', 'Selfportrait', '2009', '', 2, '61-45'),
(21, '2023-10-14 19:16:14.674', '2023-12-23 16:53:48.604', 'ed10gge616f91f2abjj25.jpg', 'Paint', '2000', '', 1, '60x50');

CREATE TABLE `Setting` (
  `id` int NOT NULL,
  `created` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Setting` (`id`, `created`, `updated`, `name`, `value`) VALUES
(1, '2023-10-14 19:17:56.184', '2023-12-23 16:50:02.297', 'Title', 'SERGUIUS'),
(2, '2023-10-14 19:18:15.960', '2023-10-14 19:18:15.960', 'Email', 'serguius@ymail.com'),
(3, '2023-11-05 16:39:25.302', '2023-12-23 16:50:06.392', 'Keywords', ''),
(4, '2023-11-05 16:39:43.477', '2023-11-05 16:39:43.477', 'Phone', 'serguius@ymail.com');

CREATE TABLE `User` (
  `id` int NOT NULL,
  `created` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lockcount` int NOT NULL DEFAULT '0',
  `lockflg` tinyint(1) NOT NULL DEFAULT '0',
  `lastlogin` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `User` (`id`, `created`, `updated`, `email`, `password`, `lockcount`, `lockflg`, `lastlogin`) VALUES
(1, '2023-10-14 17:28:40.138', '2023-12-23 14:39:24.568', 'test@test.com', '$argon2id$v=19$m=65536,t=3,p=4$ybW4dnjHD6DZoCiteUtL3Q$pZmvXc0UbdKslV8ZZnFX05p6Yxomb014PRCIsahz1lA', 0, 0, '2023-12-23 14:39:24.567');


ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Category_parCategoryId_fkey` (`parCategoryId`);

ALTER TABLE `Logs`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Picture`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Picture_categoryId_fkey` (`categoryId`);

ALTER TABLE `Setting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Setting_name_key` (`name`);

ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);


ALTER TABLE `Category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `Logs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `Picture`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

ALTER TABLE `Setting`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


ALTER TABLE `Category`
  ADD CONSTRAINT `Category_parCategoryId_fkey` FOREIGN KEY (`parCategoryId`) REFERENCES `Category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Picture`
  ADD CONSTRAINT `Picture_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON UPDATE CASCADE;
COMMIT;
