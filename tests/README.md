# Backend Testing Guide

This directory contains unit tests for the Todo List App backend API.

## 🧪 Test Structure

```
tests/
├── setup.ts           # Jest configuration and mocks
├── tasks.test.ts      # Task routes testing
├── server.test.ts     # Server configuration testing
├── utils/             # Test utilities and helpers
│   └── testHelpers.ts # Common test functions
└── README.md          # This file
```

## 🚀 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

## 📋 Test Coverage

### Task Routes (`tasks.test.ts`)
- ✅ **GET /api/tasks** - Fetch all tasks
- ✅ **POST /api/tasks** - Create new task
- ✅ **PUT /api/tasks/:id** - Update existing task
- ✅ **DELETE /api/tasks/:id** - Delete task
- ✅ **PATCH /api/tasks/:id/toggle** - Toggle completion

### Server Configuration (`server.test.ts`)
- ✅ **CORS** - Cross-origin request handling
- ✅ **JSON Parsing** - Request body parsing
- ✅ **Health Check** - API status endpoint

## 🎯 Testing Strategy

### 1. **Unit Testing**
- Test individual route handlers
- Mock external dependencies (Prisma, database)
- Test error handling and edge cases

### 2. **Integration Testing**
- Test complete request/response cycles
- Verify middleware configuration
- Test API endpoint behavior

### 3. **Mock Strategy**
- **Prisma Client**: Mocked to avoid database calls
- **Environment Variables**: Separate test configuration
- **External Services**: Isolated for unit testing

## 🔧 Test Utilities

### `createMockTask()`
Creates a mock task object for testing:
```typescript
const task = createMockTask({ 
  title: 'Custom Task', 
  color: 'red' 
});
```

### `createMockTasks(count)`
Creates an array of mock tasks:
```typescript
const tasks = createMockTasks(5); // Creates 5 mock tasks
```

### `mockPrismaClient`
Mock Prisma client for testing:
```typescript
mockPrismaClient.task.findMany.mockResolvedValue(tasks);
```

## 📊 Test Examples

### Testing Success Response
```typescript
it('should create a new task successfully', async () => {
  const newTask = { title: 'Test Task', color: 'blue' };
  mockPrisma.task.create.mockResolvedValue(createdTask);

  const response = await request(app)
    .post('/api/tasks')
    .send(newTask)
    .expect(201);

  expect(response.body).toEqual(createdTask);
});
```

### Testing Error Handling
```typescript
it('should return 400 for empty title', async () => {
  const response = await request(app)
    .post('/api/tasks')
    .send({ title: '', color: 'blue' })
    .expect(400);

  expect(response.body).toEqual({ error: 'Title is required' });
});
```

## 🎨 Best Practices

1. **Clear Test Names**: Use descriptive test names
2. **Arrange-Act-Assert**: Structure tests logically
3. **Mock Isolation**: Reset mocks between tests
4. **Edge Cases**: Test error conditions and validation
5. **Coverage**: Aim for high test coverage

## 🚨 Common Issues

### Prisma Mock Not Working
- Ensure mocks are set up in `setup.ts`
- Check that `jest.mock()` is called before imports

### Test Environment Variables
- Use `.env.test` for test configuration
- Ensure `NODE_ENV=test` is set

### Async Test Failures
- Use `async/await` properly
- Set appropriate Jest timeouts

## 📈 Adding New Tests

1. **Create test file**: `feature.test.ts`
2. **Import dependencies**: Mock external services
3. **Write test cases**: Cover success and error scenarios
4. **Run tests**: Verify all tests pass
5. **Update coverage**: Ensure new code is tested

---

**Happy Testing! 🧪✨**
