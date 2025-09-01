// Solución temporal: Mock de la base de datos para evitar problemas con better-sqlite3
import * as schema from './schema';

// Mock de la base de datos que simula las operaciones básicas
const mockDb = {
  select: () => ({
    from: () => ({
      where: () => ({
        orderBy: () => [],
      }),
      orderBy: () => [],
    }),
    where: () => ({
      orderBy: () => [],
    }),
    orderBy: () => [],
  }),
  insert: () => ({
    values: () => ({
      returning: () => [{ id: Date.now().toString() }],
    }),
  }),
  update: () => ({
    set: () => ({
      where: () => ({
        returning: () => [],
      }),
    }),
  }),
  delete: () => ({
    where: () => ({
      returning: () => [],
    }),
  }),
  query: {
    chats: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
    },
    messages: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
    },
  },
};

export default mockDb as any;
