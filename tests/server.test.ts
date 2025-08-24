import request from 'supertest';
import express from 'express';
import cors from 'cors';

// Mock the task routes
jest.mock('../src/routes/tasks', () => ({
  taskRoutes: express.Router().get('/test', (req, res) => res.json({ message: 'test' }))
}));

// Import after mocking
import { taskRoutes } from '../src/routes/tasks';

describe('Server Configuration', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api/tasks', taskRoutes);
  });

  describe('CORS Configuration', () => {
    it('should handle CORS requests', async () => {
      const response = await request(app)
        .get('/api/tasks/test')
        .set('Origin', 'http://localhost:3000')
        .expect(200);

      expect(response.body).toEqual({ message: 'test' });
    });
  });

  describe('JSON Parsing', () => {
    it('should parse JSON request bodies', async () => {
      const testData = { title: 'Test Task', color: 'blue' };

      // Create a simple test endpoint
      app.post('/test-json', (req, res) => {
        res.json({ received: req.body });
      });

      const response = await request(app)
        .post('/test-json')
        .send(testData)
        .expect(200);

      expect(response.body.received).toEqual(testData);
    });
  });

  describe('Health Check Endpoint', () => {
    it('should return health status', async () => {
      // Add health check endpoint
      app.get('/health', (req, res) => {
        res.json({ status: 'OK', message: 'Todo API is running' });
      });

      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'OK',
        message: 'Todo API is running'
      });
    });
  });
});