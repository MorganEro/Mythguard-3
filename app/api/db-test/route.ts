import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

/**
 * Simple connection test endpoint with detailed logging
 */
export async function GET() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
  });

  try {
    // Log connection details (sanitized)
    console.log('Connection attempt details:', {
      host: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0],
      schema: process.env.DATABASE_URL?.includes('udemy_typescript_shop'),
      ssl: process.env.DATABASE_URL?.includes('sslmode=require'),
    });

    // Basic connection test
    const result = await prisma.$queryRaw`SELECT current_database() as db, current_schema as schema`;
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      details: result
    });

  } catch (error) {
    console.error('Connection error details:', {
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
