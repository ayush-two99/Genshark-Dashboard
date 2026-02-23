import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export type KeywordClusterRow = {
  keyword: string;
  cluster: string;
  searchVolume: number;
};

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'keywords-cluster-keywords.json');
    const raw = await readFile(dataPath, 'utf-8');
    const data: KeywordClusterRow[] = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (err) {
    console.error('keywords-cluster-keywords API error', err);
    return NextResponse.json(
      { error: 'Failed to load keyword data' },
      { status: 500 }
    );
  }
}
