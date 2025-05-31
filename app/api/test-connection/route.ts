import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    // First, check if we can connect at all
    const { data: schemas, error: schemaError } = await supabase
      .rpc('get_schemas');

    if (schemaError) {
      console.error('Schema Error:', schemaError.message);
      return NextResponse.json({ error: schemaError.message }, { status: 500 });
    }

    // Check if our schema exists
    const hasSchema = schemas?.includes('udemy_typescript_shop');
    
    return NextResponse.json({ 
      message: 'Successfully connected to Supabase!',
      schemas,
      hasExpectedSchema: hasSchema
    });
  } catch (error: any) {
    console.error('Connection Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to connect to database'
    }, { status: 500 });
  }
}
