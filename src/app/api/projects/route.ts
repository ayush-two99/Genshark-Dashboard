import { NextResponse } from 'next/server';
import data from '@/data/mock/projects.json';

export async function GET() {
  return NextResponse.json(data.projects);
}


