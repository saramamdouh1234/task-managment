# 📋 Task Management Application

A full-stack task management application built with Node.js, Express, React, PostgreSQL, and Docker.

## Features

### Authentication
- User login (token-based)
- Redirect to login page if not authenticated
- Protect tasks route from unauthorized access

### Task Management
- View tasks after login
- Tasks are user-specific
- Redirect to tasks page if already logged in
- Simple task display (TaskList component)

### UI Features
- Clean and responsive design
- Loading states
- Error handling
- Real-time task updates

## Tech Stack

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- JWT for authentication
- Bcrypt for password hashing
- Sequelize (ORM for database)

**Frontend:**
- React
- CSS3
- Axios

**DevOps:**
- Docker


## Prerequisites

- Docker 
- Git

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository**

```bash
git clone git@github.com:saramamdouh1234/task-managment.git
cd task-managment

instead of 
git clone <your-repo-url>
cd task-managment
```

2. **Start the application**

```bash
docker-compose -f postgres-docker.yml up --build
```
### Note: 
- Docker is used only to run the PostgreSQL database.
- Setting up Docker for the rest of the application is not fully completed yet.

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001/api


### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

Frontend will run on: http://localhost:3000

## API Documentation

You can access the Postman Collection directly [here](https://www.postman.co/workspace/My-Workspace~847039f4-9b79-4179-8979-9d998592f6d0/collection/29170236-b89fbb01-0023-4def-bb88-07edb49c3f27?action=share&creator=29170236)

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json
```

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json
```

**Request:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### Task Endpoints (All require Authentication)

All task endpoints require the **Authorization header**:

```
Authorization: Bearer <your_jwt_token>
```

#### Get All Tasks

```http
GET /api/tasks
```

**Response:**

```json
[
  {
        "id": 16,
        "title": "Updated task title",
        "description": "Docker setup",
        "status": "in_progress",
        "userId": 1,
        "createdAt": "2026-01-13T07:00:28.208Z",
        "updatedAt": "2026-01-13T10:51:20.318Z"
    }
]
```

#### Create Task

```http
POST /api/tasks
Content-Type: application/json
```

**Request:**

```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending"
}
```

**Response:**

```json
{
    "id": 24,
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "userId": 1,
    "updatedAt": "2026-01-13T10:52:59.611Z",
    "createdAt": "2026-01-13T10:52:59.611Z"
}
```

#### Update Task

```http
PUT /api/tasks/:id
Content-Type: application/json
```

**Request:**

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "done"
}
```

**Response:**

```json
{
    "id": 16,
    "title": "Updated task title",
    "description": "Docker setup",
    "status": "in_progress",
    "userId": 1,
    "createdAt": "2026-01-13T07:00:28.208Z",
    "updatedAt": "2026-01-13T10:51:20.318Z"
}
```

#### Delete Task

```http
DELETE /api/tasks/:id
```

**Response:**

```json
{
  "message": "Task deleted successfully"
}
```

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS enabled for frontend-backend communication
- Users can only access their own tasks

## Assumptions & Design Decisions

- Database: PostgreSQL 🐘
- Authentication: JWT tokens with 24-hour expiration 🔑
- Task Status: limited to `pending`, `in_progress`, `done` 📊
- Token Storage: localStorage 💾

## Testing the Application

1. Open http://localhost:3000
2. Register a new user
3. Login → redirected to **Tasks** page
4. Create, update, delete tasks
5. Status can be changed via dropdown

## Future Enhancements

- 📄 Pagination for tasks
- 🏷️ Task categories/tags
- 📧 Email notifications & reminders
- 🔍 Search and filter tasks
- 👤 User profile management