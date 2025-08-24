import request from 'supertest';
import express from 'express';
import cors from 'cors';

// Mock Prisma client
const mockPrisma = {
  task: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
  $disconnect: jest.fn(),
};

// Mock the entire module before importing
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrisma)
  };
});

// Now import the routes
import { taskRoutes } from '../src/routes/tasks';

// Create test app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task Routes - Fixed', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks successfully', async () => {
      const mockTasks = [
        { id: 1, title: 'Test Task 1', color: 'blue', completed: false, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
        { id: 2, title: 'Test Task 2', color: 'red', completed: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }
      ];

      mockPrisma.task.findMany.mockResolvedValue(mockTasks);

      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body).toEqual(mockTasks);
      expect(mockPrisma.task.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' }
      });
    });

    it('should handle database errors gracefully', async () => {
      mockPrisma.task.findMany.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/tasks')
        .expect(500);

      expect(response.body).toEqual({ error: 'Failed to fetch tasks' });
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task successfully', async () => {
      const newTask = {
        title: 'New Test Task',
        color: 'green'
      };

      const createdTask = {
        id: 1,
        ...newTask,
        completed: false,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
      };

      mockPrisma.task.create.mockResolvedValue(createdTask);

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body).toEqual(createdTask);
      expect(mockPrisma.task.create).toHaveBeenCalledWith({
        data: {
          title: 'New Test Task',
          color: 'green',
          completed: false
        }
      });
    });

    it('should return 400 for empty title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '', color: 'blue' })
        .expect(400);

      expect(response.body).toEqual({ error: 'Title is required' });
    });

    it('should use default color when not provided', async () => {
      const newTask = { title: 'Test Task' };
      const createdTask = {
        id: 1,
        ...newTask,
        color: 'blue',
        completed: false,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
      };

      mockPrisma.task.create.mockResolvedValue(createdTask);

      await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(mockPrisma.task.create).toHaveBeenCalledWith({
        data: {
          title: 'Test Task',
          color: 'blue',
          completed: false
        }
      });
    });
  });

  describe('PUT /api/tasks/:id - Regular Update', () => {
    it('should update a task successfully', async () => {
      const taskId = 1;
      const updateData = {
        title: 'Updated Task',
        color: 'purple',
        completed: true
      };

      const updatedTask = {
        id: taskId,
        ...updateData,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
      };

      mockPrisma.task.update.mockResolvedValue(updatedTask);

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual(updatedTask);
      expect(mockPrisma.task.update).toHaveBeenCalledWith({
        where: { id: taskId },
        data: {
          title: 'Updated Task',
          color: 'purple',
          completed: true
        }
      });
    });

    it('should return 400 for empty title on update', async () => {
      const response = await request(app)
        .put('/api/tasks/1')
        .send({ title: '', color: 'blue' })
        .expect(400);

      expect(response.body).toEqual({ error: 'Title is required' });
    });
  });

  describe('PUT /api/tasks/:id - Toggle Functionality', () => {
    it('should toggle task completion successfully', async () => {
      const taskId = 1;
      const currentTask = {
        id: taskId,
        title: 'Test Task',
        color: 'blue',
        completed: false,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
      };

      const toggledTask = {
        ...currentTask,
        completed: true
      };

      mockPrisma.task.findUnique.mockResolvedValue(currentTask);
      mockPrisma.task.update.mockResolvedValue(toggledTask);

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ toggle: true })
        .expect(200);

      expect(response.body).toEqual(toggledTask);
      expect(mockPrisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: taskId }
      });
      expect(mockPrisma.task.update).toHaveBeenCalledWith({
        where: { id: taskId },
        data: { completed: true }
      });
    });

    it('should return 404 for non-existent task when toggling', async () => {
      mockPrisma.task.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .put('/api/tasks/999')
        .send({ toggle: true })
        .expect(404);

      expect(response.body).toEqual({ error: 'Task not found' });
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task successfully', async () => {
      const taskId = 1;
      mockPrisma.task.delete.mockResolvedValue({ id: taskId });

      const response = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .expect(200);

      expect(response.body).toEqual({ message: 'Task deleted successfully' });
      expect(mockPrisma.task.delete).toHaveBeenCalledWith({
        where: { id: taskId }
      });
    });
  });
});
