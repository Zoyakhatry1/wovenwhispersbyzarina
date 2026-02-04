import { NextResponse } from 'next/server';
import { products as defaultProducts } from '@/data/products';

export async function GET() {
  try {
    // If Supabase is configured, fetch from there
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      // If we have data from Supabase, use it
      if (data && data.length > 0) {
        return NextResponse.json(data);
      }
    }
    
    // Fallback to default products
    return NextResponse.json(defaultProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    // On error, return default products
    return NextResponse.json(defaultProducts);
  }
}

export async function POST(request) {
  try {
    const products = await request.json();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Delete all existing products
    await supabase.from('products').delete().neq('id', 0);

    // Insert new products
    const { data, error } = await supabase.from('products').insert(products);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error saving products:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
