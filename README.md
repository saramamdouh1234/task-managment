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
- Node js

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository**

```bash
instead of 
git clone git@github.com:saramamdouh1234/task-managment.git
cd task-managment
```

2. **Start the application**

```bash
docker-compose -f postgres-docker.yml up --build
```

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

You can explore and test all API endpoints via this Postman Collection.
 [Postman Collection](https://www.postman.com/supply-meteorologist-35303576/task-mangment/collection/29170236-b89fbb01-0023-4def-bb88-07edb49c3f27/?action=share&creator=0)
 

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS enabled for frontend-backend communication
- Users can only access their own tasks

## Design Decisions

- Database: PostgreSQL 🐘
- Authentication: JWT tokens with 24-hour expiration 🔑
- Token Storage: localStorage 💾
- The project uses a config file with hard-coded values for database settings, but ideally, .env should be used to keep sensitive Data secure and avoid pushing it to Git.



