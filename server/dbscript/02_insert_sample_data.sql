-- Sample Data for Task Tracker Application
-- This script inserts sample tasks to demonstrate the application

USE `task-tracker`;

-- Insert sample tasks with various statuses and priorities
INSERT INTO `task` (`title`, `description`, `status`, `priority`, `due_date`, `created_at`, `updated_at`) VALUES
('Complete Project Documentation', 'Write comprehensive documentation for the task tracker project including setup instructions and API documentation', 'TODO', 'HIGH', '2026-02-20', NOW(), NOW()),
('Fix Login Bug', 'Investigate and fix the authentication issue reported by users', 'IN_PROGRESS', 'CRITICAL', '2026-02-17', NOW(), NOW()),
('Code Review - Dashboard', 'Review the dashboard component code and provide feedback', 'REVIEW', 'MEDIUM', '2026-02-18', NOW(), NOW()),
('Deploy to Production', 'Deploy the latest version to production server', 'TODO', 'MEDIUM', '2026-02-25', NOW(), NOW()),
('Update Dependencies', 'Update all npm and maven dependencies to latest stable versions', 'DONE', 'LOW', '2026-02-15', NOW(), NOW()),
('Design Database Schema', 'Create and finalize the database schema for user management', 'TODO', 'HIGH', '2026-02-22', NOW(), NOW()),
('Setup CI/CD Pipeline', 'Configure GitHub Actions for automated testing and deployment', 'IN_PROGRESS', 'HIGH', '2026-02-19', NOW(), NOW()),
('Write Unit Tests', 'Write unit tests for the task service layer', 'TODO', 'MEDIUM', '2026-02-23', NOW(), NOW()),
('Implement Dark Mode', 'Add dark mode support to the frontend application', 'TODO', 'LOW', '2026-03-01', NOW(), NOW()),
('Performance Optimization', 'Optimize database queries and add caching layer', 'DONE', 'MEDIUM', '2026-02-14', NOW(), NOW());
