import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const brandToFile: Record<string, string> = {
  mahindra: 'Mahindra Finance Genshark AI - 2026 - mahindra finance.csv',
  piramal: 'Mahindra Finance Genshark AI - 2026 - piramal finance.csv',
  sriram: 'Mahindra Finance Genshark AI - 2026 - Sriram finance.csv',
  muthoot: 'Mahindra Finance Genshark AI - 2026 - Muthoot finance.csv',
};

export type PageWiseRow = {
  url: string;
  category: string;
  trafficPct: number;
  numKeywords: number;
  traffic: number;
};

function parseRow(line: string): PageWiseRow | null {
  const parts = line.split(',');
  if (parts.length < 5) return null;
  const url = parts[0].trim();
  const category = parts[1].trim();
  const trafficPct = parseFloat(parts[2].trim()) || 0;
  const numKeywords = parseInt(parts[3].trim(), 10) || 0;
  const traffic = parseInt(parts[4].trim(), 10) || 0;
  if (!url || url.toLowerCase() === 'url') return null;
  return { url, category, trafficPct, numKeywords, traffic };
}

export async function GET(request: NextRequest) {
  const brand = request.nextUrl.searchParams.get('brand') || 'mahindra';
  const limitParam = request.nextUrl.searchParams.get('limit');
  // No limit = all rows; optional limit for performance (max 25000)
  const limit = limitParam ? Math.min(25000, parseInt(limitParam, 10) || 0) : 0;

  const filename = brandToFile[brand.toLowerCase()];
  if (!filename) {
    return NextResponse.json(
      { error: 'Invalid brand. Use: mahindra, piramal, sriram, muthoot' },
      { status: 400 }
    );
  }

  try {
    const dataDir = path.join(process.cwd(), 'src', 'data', filename);
    const raw = await readFile(dataDir, 'utf-8');
    const lines = raw.split(/\r?\n/).filter((l) => l.trim());
    const rows: PageWiseRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      if (limit > 0 && rows.length >= limit) break;
      const row = parseRow(lines[i]);
      if (row) rows.push(row);
    }
    return NextResponse.json(rows);
  } catch (err) {
    console.error('page-wise API error', err);
    return NextResponse.json(
      { error: 'Failed to read data for this brand' },
      { status: 500 }
    );
  }
}
