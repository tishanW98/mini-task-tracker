-- Task Tracker Database Setup
-- This script creates the database and tables for the Task Tracker application

-- Create database (if using manual setup instead of createDatabaseIfNotExist)
CREATE DATABASE IF NOT EXISTS `task-tracker`;
USE `task-tracker`;

-- Create task table
CREATE TABLE IF NOT EXISTS `task` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(1000) DEFAULT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'TODO',
  `priority` VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
  `due_date` DATE DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_priority` (`priority`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
