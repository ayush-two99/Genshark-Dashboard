import { NextResponse } from 'next/server';
import data from '@/data/mock/content-lab.json';

export async function GET() {
  return NextResponse.json(data.content);
}
