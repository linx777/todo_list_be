export const PrismaClient = jest.fn().mockImplementation(() => ({
  task: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
  $disconnect: jest.fn(),
}));
