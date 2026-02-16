# Task Tracker Application

A full-stack mini task tracker application built with React (frontend) and Spring Boot (backend), featuring real-time task tracking with Redis caching.

## Features

- Create, Read, Update, Delete (CRUD) tasks
- Filter tasks by status
- Priority-based color coding
- Real-time status updates
- Redis caching for improved performance
- Responsive design with Tailwind CSS
- Clean and intuitive user interface

## Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17** or higher
- **Maven 3.6+**
- **Node.js 18+** and npm
- **MySQL 8.0+**
- **Redis**

## Database Setup

### Step 1: Install MySQL

Download and install MySQL from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

### Step 2: Create Database User

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE USER IF NOT EXISTS 'DB_USERNAME'@'localhost' IDENTIFIED BY 'DB_PASSWORD';
GRANT ALL PRIVILEGES ON `task-tracker`.* TO 'DB_USERNAME'@'localhost';
FLUSH PRIVILEGES;
```

### Step 3: Run Database Scripts

Navigate to the database scripts folder:

```bash
cd server/dbscript
```

**Option A: Automatic Setup**

The Spring Boot application will automatically create the database and tables on first run. You only need to run the sample data script:

```bash
mysql -u DB_USERNAME -p < 02_insert_sample_data.sql
# Password: DB_PASSWORD
```

**Option B: Manual Setup**

Run all scripts in order:

```bash
mysql -u root -p < 01_create_database.sql
mysql -u root -p < 02_insert_sample_data.sql
```

## Redis Setup

### Windows
1. Download Redis from [https://github.com/microsoftarchive/redis/releases](https://github.com/microsoftarchive/redis/releases)
2. Extract and run `redis-server.exe`

### Linux/Mac
```bash
# Install Redis
sudo apt-get install redis-server  # Ubuntu/Debian
brew install redis                  # macOS

# Start Redis
redis-server
```

### Verify Redis is Running
```bash
redis-cli ping
# Should return: PONG
```

**Note:** If you don't want to use Redis, comment out the Redis configuration in `server/src/main/resources/application.properties`:

```properties
# spring.data.redis.host=localhost
# spring.data.redis.port=6379
# spring.cache.type=redis
```

## Backend Setup

### Step 1: Navigate to Backend Folder

```bash
cd server
```

### Step 2: Update Configuration (if needed)

Edit `src/main/resources/application.properties` if you need to change database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/task-tracker?createDatabaseIfNotExist=true
spring.datasource.username=DB_USERNAME
spring.datasource.password=DB_PASSWORD
```

### Step 3: Build the Project

```bash
mvn clean install
```

### Step 4: Run the Backend

```bash
mvn spring-boot:run
```

Or run the JAR file:

```bash
java -jar target/server-0.0.1-SNAPSHOT.jar
```

The backend server will start on **http://localhost:8081**

### Verify Backend is Running

Open your browser and go to: [http://localhost:8081/api/tasks](http://localhost:8081/api/tasks)

You should see a JSON response with the list of tasks.

## Frontend Setup

### Step 1: Navigate to Frontend Folder

```bash
cd client
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Development Server

```bash
npm run dev
```

The frontend application will start on **http://localhost:5173**

### Step 4: Access the Application

Open your browser and navigate to: [http://localhost:5173](http://localhost:5173)

## Project Structure

```
task-tracker/
├── client/                      # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/                # API service layer
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Backend (Spring Boot)
│   ├── dbscript/               # Database scripts
│   │   ├── 01_create_database.sql
│   │   ├── 02_insert_sample_data.sql
│   │   └── README.md
│   ├── src/
│   │   └── main/
│   │       ├── java/com/miraisense/server/
│   │       │   ├── config/         # Configuration classes
│   │       │   ├── controller/     # REST controllers
│   │       │   ├── dto/            # Data transfer objects
│   │       │   ├── entity/         # JPA entities
│   │       │   ├── exception/      # Exception handlers
│   │       │   ├── mapper/         # Entity-DTO mappers
│   │       │   ├── repository/     # Database repositories
│   │       │   └── service/        # Business logic
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── README.md
```

## API Endpoints

### Task Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks?status=TODO` | Get tasks by status |
| GET | `/api/tasks/{id}` | Get task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |
| PATCH | `/api/tasks/{id}/status` | Update task status |
| GET | `/api/tasks/{id}/exists` | Check if task exists |

### Task Statuses
- `TODO` - Task not started
- `IN_PROGRESS` - Task in progress
- `REVIEW` - Task under review
- `DONE` - Task completed

### Task Priorities
- `LOW` - Low priority
- `MEDIUM` - Medium priority
- `HIGH` - High priority
- `CRITICAL` - Critical priority

## Technology Stack

### Frontend
- **React 19.2** - UI framework
- **Vite 7.3.1** - Build tool
- **Tailwind CSS 4.1.18** - Styling
- **React Router DOM 7.13** - Routing

### Backend
- **Spring Boot 4.0.2** - Application framework
- **Java 17** - Programming language
- **Spring Data JPA** - Database ORM
- **MySQL 8.0+** - Database
- **Redis** - Caching layer
- **Maven** - Dependency management
- **Lombok** - Reduce boilerplate code

## Build for Production

### Backend

```bash
cd server
mvn clean package
java -jar target/server-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd client
npm run build
```

The production build will be in the `client/dist` folder. Deploy it to any static hosting service.

## 📄 License

This project is created for educational and demonstration purposes.

