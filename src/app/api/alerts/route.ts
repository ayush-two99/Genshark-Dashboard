import { NextResponse } from 'next/server';
import data from '@/data/mock/alerts.json';

export async function GET() {
  return NextResponse.json(data.alerts);
}

export async function POST(request: Request) {
  const { id } = await request.json();
  // Mock resolve action
  return NextResponse.json({ id, status: 'resolved' });
}
