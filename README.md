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
   DATABASE_URL="mysql://root@localhost:3306/todo_app"
   PORT=3001
   ```
   
   **Note:** If you have a password for your MySQL root user, use:
   ```env
   DATABASE_URL="mysql://root:your_password@localhost:3306/todo_app"
   ```

3. **Setup database:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations (creates tables if they don't exist)
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

**Update a task:**
```bash
curl -X PUT http://localhost:3001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "completed": true, "color": "green"}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:3001/api/tasks/1
```

## Commands 💻

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm start          # Start production server
npm test           # Run tests
```

## Troubleshooting 🔧

### Database Connection Issues
- **Authentication failed:** Check your MySQL credentials in `.env`
- **Database not found:** Create the database: `mysql -u root -p -e "CREATE DATABASE todo_app;"`
- **Connection refused:** Make sure MySQL is running: `brew services start mysql`

### Port Issues
- **Port 3001 in use:** Change PORT in `.env` to another port (e.g., 3002)

### Dependency Issues
- **Module errors:** Run `npm install` again
- **Prisma errors:** Run `npx prisma generate` to regenerate the client

### Common Solutions
```bash
# Restart MySQL (macOS with Homebrew)
brew services restart mysql

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

## Development Workflow 🚀

1. **Start MySQL:** `brew services start mysql`
2. **Start Backend:** `npm run dev` (runs on http://localhost:3001)
3. **Start Frontend:** In another terminal, go to `../todo_list_fe` and run `npm run dev` (runs on http://localhost:3000)

## Tech Stack 🛠️

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database toolkit and ORM
- **MySQL** - Database
- **Jest** - Testing framework
- **Nodemon** - Development server with hot reload

## Project Structure 📁

```
todo_list_be/
├── src/
│   ├── index.ts          # Main server file
│   └── routes/
│       └── tasks.ts      # Task API routes
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── tests/                # Test files
├── .env                  # Environment variables
└── package.json          # Dependencies and scripts
```

