import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/tasks - Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, color } = req.body;
    
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        color: color || 'blue',
        completed: false
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id - Update a task or toggle completion
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, color, completed, toggle } = req.body;
    
    // If toggle is true, just toggle the completion status
    if (toggle === true) {
      const currentTask = await prisma.task.findUnique({
        where: { id: parseInt(id) }
      });

      if (!currentTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      const task = await prisma.task.update({
        where: { id: parseInt(id) },
        data: { completed: !currentTask.completed }
      });

      return res.json(task);
    }
    
    // Regular update - title is required
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title: title.trim(),
        color: color || 'blue',
        completed: completed !== undefined ? completed : false
      }
    });

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});



export { router as taskRoutes };

