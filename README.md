# Task Management API 🚀

This API allows you to manage tasks in applications, including creating, reading, updating, and deleting tasks. It uses Express and MySQL as the database🔥 But it's not a production ready API, it's just a simple example to learn and practice.

It's is a simple API that I developed to improve my skills in Node.js and Express and API architecture. It's a work in progress and I'm open to suggestions and improvements. 🤝

## Endpoints

### 1. Get All Tasks

- **Method:** `GET`
- **Route:** `/api/tasks`
- **Query Parameters:**
  - `page`: Page number (defaults to 1)
  - `limit`: Number of results per page (defaults to 10, or returns all if omitted)
- **Response:**
  ```json
  {
    "tasks": [ ... ],  // Array of tasks
    "total": 100,      // Total number of tasks
    "page": 1,         // Current page
    "limit": 10        // Limit of tasks per page
  }
  ```

# Get Tasks by User ID

- **Method:** `GET`
- **Route:** `/api/tasks/user/:id`
- **URL Params:**
  - `id`: User ID
- **Query Parameters:**
  - `page`: Page number (defaults to 1)
  - `limit`: Number of results per page (defaults to 10, or returns all if omitted)
- **Response:**
  ```json
  {
    "tasks": [ ... ],  // Array of tasks for the user
    "total": 50,       // Total number of tasks for the user
    "page": 1,         // Current page
    "limit": 10        // Limit of tasks per page
  }
  ```

# Get Task by ID

- **Method:** `GET`
- **Route:** `/api/tasks/:id`
- **URL Params:**
  - `id`: Task ID
- **Response:**
  ```json
  {
    "task": { ... },  // Task object
  }
  ```

# Add Task

- **Method:** `POST`
- **Route:** `/api/tasks`
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "todo", // Possible values: done, inProgress, todo
    "userId": 1, // User ID
    "parentTaskId": null, // Parent task ID
    "deadline": null, // Date object
    "priority": 1 // Priority of the task
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "status": "todo",
    "userId": 1,
    "parentTaskId": null,
    "deadline": "2024-12-31T23:59:59",
    "createdAt": "2024-01-01T12:00:00",
    "updatedAt": "2024-01-01T12:00:00"
  }
  ```

# Update Task

- **Method:** `PUT`
- **Route:** `/api/tasks/:id`
- **URL Params:**
  - `id`: Task ID
- **Request Body:**
  ```json
  {
    "title": "New Task Title",
    "description": "New Task Description",
    "status": "todo",
    "userId": 1,
    "parentTaskId": null,
    "deadline": null,
    "priority": 1
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "New title",
    "description": "New description",
    "status": "inProgress",
    "userId": 1,
    "parentTaskId": null,
    "deadline": "2024-12-31T23:59:59",
    "createdAt": "2024-01-01T12:00:00",
    "updatedAt": "2024-01-02T12:00:00"
  }****
  ```

# Delete Task

- **Method:** `DELETE`
- **Route:** `/api/tasks/:id`
- **URL Params:**
  - `id`: Task ID
- **Response:**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

# Requirements

- Node.js
- MySQL (I using docker to run the database)

# Installation

1. Clone the repository
   ```bash
    git clone https://github.com/your_username/your_repository.git
   cd your_repository
   ```
2. Install dependencies
   ```bash
    npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```bash
    DB_HOST=localhost
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_NAME=tasks_db
   ```
4. Start the server
   ```bash
    npm run start
   ```
5. Open your browser and navigate to `http://localhost:3000/api/tasks`
