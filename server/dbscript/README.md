# Database Scripts

This folder contains SQL scripts to set up the Task Tracker database.

## Scripts Overview

1. **01_create_database.sql** - Creates the database and task table
2. **02_insert_sample_data.sql** - Inserts sample tasks for testing

## How to Run

### Option 1: Using MySQL Command Line

```bash
# Run scripts in order
mysql -u root -p < 01_create_database.sql
mysql -u root -p < 02_insert_sample_data.sql
```

### Option 2: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open each script file and execute them in order

### Option 3: Automatic Creation

The Spring Boot application is configured with `createDatabaseIfNotExist=true`, so:
- The database will be created automatically when you run the application
- Tables will be created/updated automatically by Hibernate (ddl-auto=update)
- You only need to run **02_insert_sample_data.sql** for sample data

## Database User Setup

The application uses these credentials (configured in application.properties):
- Username: `DB_USERNAME`
- Password: `DB_PASSWORD`
- Database: `task-tracker`

### Create MySQL User

```sql
CREATE USER IF NOT EXISTS 'DB_USERNAME'@'localhost' IDENTIFIED BY 'DB_PASSWORD';
GRANT ALL PRIVILEGES ON `task-tracker`.* TO 'DB_USERNAME'@'localhost';
FLUSH PRIVILEGES;
```

## Table Structure

### task table
- `id` - Auto-increment primary key
- `title` - Task title (required)
- `description` - Task description
- `status` - Task status (TODO, IN_PROGRESS, REVIEW, DONE)
- `priority` - Task priority (LOW, MEDIUM, HIGH, CRITICAL)
- `due_date` - Due date for the task
- `created_at` - Timestamp when task was created
- `updated_at` - Timestamp when task was last updated
