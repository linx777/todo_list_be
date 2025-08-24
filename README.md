# Todo List App - Backend 🚀

A simple Express.js API for managing todo tasks with MySQL database.

## What It Does 📋

- ✅ Get all tasks
- ➕ Create new tasks  
- ✏️ Update tasks
- 🗑️ Delete tasks

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task or toggle completion
- `DELETE /api/tasks/:id` - Delete a task

## Quick Setup 🛠️

### Prerequisites
- Node.js (v16+)
- MySQL database
- npm

### Installation

1. **Install packages:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/todo_app"
   PORT=3001
   ```

3. **Setup database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Start server:**
   ```bash
   npm run dev
   ```

## Testing 🧪

Visit `http://localhost:3001/api/tasks` in your browser to see your tasks.

## Example API Usage

**Create a task:**
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "color": "blue"}'
```

**Get all tasks:**
```bash
curl http://localhost:3001/api/tasks
```

## Commands 💻

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
npm test       # Run tests
```

## Troubleshooting 🔧

- **Database connection error:** Check your `.env` file
- **Port in use:** Change PORT in `.env` to 3002
- **Module errors:** Run `npm install` again

## Tech Stack 🛠️

- Express.js - Web framework
- TypeScript - Type safety
- Prisma - Database toolkit
- MySQL - Database

