# Full Stack Task Management Web Application

## Overview

This project is a full-stack task management web application that enables users to register, log in, and manage tasks through add, update, delete, and get tasks. The frontend is built using **React** to provide a user-friendly interface, while the backend is built using **Node.js** and **Express** to handle the application's API. **MongoDB** serves as the database to store user and task data.
Tasks in this application can be either **Completed** or **Pending**, allowing users to easily track their progress.

- **User Authentication**:
  - **Register**: Create a new user account.
  - **Login**: Authenticate users to access the application.
- **Task Management**:
  - **Add Task**: Allows users to create a new task.
  - **Update Task**: Users can modify the content of a task.
  - **Delete Task**: Users can remove a task.
  - **Get Task**: View all tasks created by the user.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### Configure Environment Variables For backend:

### Create a .env file in the backend directory and add the following:

```bash
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

## Start Backend

```bash
npm start
```

### 3. Frontend Setup

```bash
cd /frontend
npm install
```

### Configure Environment Variables For Frontend:

### Create a .env file in the backend directory and add the following:

```bash
REACT_APP_API_URL=http://localhost:5000
```

## Start Frontend

```bash
npm start
```
