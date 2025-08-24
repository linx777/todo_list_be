import { Task } from '../../src/types/Task';

export const createMockTask = (overrides: Partial<Task> = {}): Task => {
  const now = new Date();
  return {
    id: 1,
    title: 'Test Task',
    color: 'blue',
    completed: false,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
};

export const createMockTasks = (count: number): Task[] => {
  return Array.from({ length: count }, (_, index) => 
    createMockTask({
      id: index + 1,
      title: `Test Task ${index + 1}`,
      color: ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'brown'][index % 8]
    })
  );
};

export const mockPrismaClient = {
  task: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
  $disconnect: jest.fn(),
};

export const resetMockPrisma = () => {
  Object.values(mockPrismaClient.task).forEach(mock => {
    if (typeof mock === 'function') {
      mock.mockReset();
    }
  });
  mockPrismaClient.$disconnect.mockReset();
};
