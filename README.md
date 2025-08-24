# Todo List App - Backend

A simple Express.js API for the Todo List application.

## Features

- RESTful API endpoints for CRUD operations on tasks
- MySQL database with Prisma ORM
- TypeScript support
- Input validation and error handling

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task or toggle completion
- `DELETE /api/tasks/:id` - Delete a task


## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following environment variables:
   
   ```bash
   # Database Configuration
   DATABASE_URL="mysql://username:password@localhost:3306/todo_app"
   
   # Server Configuration (optional)
   PORT=3001
   ```
   
   **DATABASE_URL Format:**
   - Local MySQL: `mysql://username:password@localhost:3306/todo_app`
   - Remote MySQL: `mysql://username:password@hostname:3306/todo_app`
   - With SSL: `mysql://username:password@hostname:3306/todo_app?sslmode=require`
   
   **Required Variables:**
   - `DATABASE_URL`: MySQL connection string (required)
   
   **Optional Variables:**
   - `PORT`: Server port (default: 3001)
   
   **Example .env file:**
   ```env
   DATABASE_URL="mysql://root:mypassword@localhost:3306/todo_app"
   PORT=3001
   ```

3. Set up the database:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Create and run database migrations
   npx prisma migrate dev --name init
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on port 3001 (or the port specified in your `.env` file).

### Database Schema

The Task model includes:
- `id`: Unique identifier (auto-increment)
- `title`: Task title (required)
- `color`: Task color (default: blue)
- `completed`: Completion status (default: false)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm start` - Start the production server

## Development

The project uses:
- **Express.js** for the web framework
- **Prisma** for database operations
- **TypeScript** for type safety
- **CORS** for cross-origin requests
- **dotenv** for environment variables

