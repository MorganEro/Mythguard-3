import { PrismaClient } from '@prisma/client';

async function testPrismaConnection() {
  try {
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    
    console.log('Attempting to connect to database...');
    
    const testProduct = await prisma.testProduct.findFirst();
    console.log('✅ Successfully connected to database!');
    console.log('Test Product:', testProduct);
    
    await prisma.$disconnect();
  } catch (error: any) {
    console.error('❌ Prisma Connection Error:', error.message);
    
    // Log connection details (safely)
    if (process.env.DATABASE_URL) {
      console.log('\nDatabase URL structure:');
      const url = new URL(process.env.DATABASE_URL);
      console.log('Host:', url.hostname);
      console.log('Port:', url.port);
      console.log('Path:', url.pathname);
      console.log('Search:', url.search);
    }
    
    if (process.env.DIRECT_URL) {
      console.log('\nDirect URL structure:');
      const url = new URL(process.env.DIRECT_URL);
      console.log('Host:', url.hostname);
      console.log('Port:', url.port);
      console.log('Path:', url.pathname);
      console.log('Search:', url.search);
    }
  }
}

testPrismaConnection();
