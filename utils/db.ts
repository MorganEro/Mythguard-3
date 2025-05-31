import { PrismaClient } from "@prisma/client";

/**
 * Custom error type for database connection issues
 */
export class DatabaseError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'DatabaseError';
  }
}

declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Creates a new PrismaClient instance with error handling and logging
 * @returns PrismaClient
 * @throws DatabaseError if connection fails
 */
const prismaClientSingleton = () => {
  try {
    const client = new PrismaClient({
      log: ['error', 'warn'],
      errorFormat: 'pretty',
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });

    // Test the connection immediately
    void client.$connect()
      .catch((error: Error) => {
        console.error('Failed to connect to database:', error);
        console.error('Connection details:', {
          hasDbUrl: !!process.env.DATABASE_URL,
          hasDirectUrl: !!process.env.DIRECT_URL,
          poolerFormat: process.env.DATABASE_URL?.includes('pooler.supabase.com')
        });
        throw new DatabaseError('Database connection failed', error);
      });

    return client;
  } catch (error: unknown) {
    throw new DatabaseError('Failed to initialize database client', error);
  }
};

/**
 * Singleton instance of PrismaClient with connection error handling
 * @throws DatabaseError if connection cannot be established
 */
export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Handle cleanup on application shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});