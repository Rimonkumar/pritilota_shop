import { NextResponse } from 'next/server';
import { seedData } from '@/lib/seed';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ message: 'Not allowed in production' }, { status: 403 });
  }

  try {
    await seedData();
    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
