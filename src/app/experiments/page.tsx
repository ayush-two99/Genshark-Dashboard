'use client';

import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink, BarChart3, Loader2, AlertCircle } from 'lucide-react';

type BrandId = 'mahindra' | 'piramal' | 'sriram' | 'muthoot';

type PageRow = {
  url: string;
  category: string;
  trafficPct: number;
  numKeywords: number;
  traffic: number;
};

const brands: { id: BrandId; label: string }[] = [
  { id: 'mahindra', label: 'Mahindra Finance' },
  { id: 'piramal', label: 'Piramal Finance' },
  { id: 'sriram', label: 'Sriram Finance' },
  { id: 'muthoot', label: 'Muthoot Finance' },
];

const ROWS_LIMIT = 0; // 0 = fetch all rows per brand

export default function PageWiseAnalysisPage() {
  const [selectedBrand, setSelectedBrand] = useState<BrandId>('mahindra');
  const [rows, setRows] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const brandLabel = brands.find((b) => b.id === selectedBrand)?.label ?? selectedBrand;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/page-wise?brand=${selectedBrand}${ROWS_LIMIT ? `&limit=${ROWS_LIMIT}` : ''}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText || 'Failed to load');
        return res.json();
      })
      .then((data: PageRow[]) => {
        if (!cancelled) setRows(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || 'Failed to load data');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedBrand]);

  return (
    <div className="space-y-8 p-6 bg-gradient-to-b from-gray-50/80 to-white min-h-screen">
      {/* Page header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-700 via-blue-600 to-indigo-700 px-8 py-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <FileText className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Page wise analysis</h1>
            <p className="mt-2 text-blue-100 text-lg">URL, category, traffic share, keywords and traffic by brand</p>
          </div>
        </div>
      </div>

      {/* Brand switcher */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Select brand</p>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(brand.id)}
              disabled={loading}
              className={`relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 ${
                selectedBrand === brand.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/50'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {brand.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-2xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100/80 px-6 py-5 border-b border-gray-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{brandLabel}</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {loading ? 'Loading…' : `${rows.length.toLocaleString()} page${rows.length !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-b-2xl">
          {error && (
            <div className="flex items-center gap-3 p-6 bg-red-50 border-b border-red-100 text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center py-24 text-gray-500">
              <Loader2 className="h-8 w-8 animate-spin mr-2" />
              <span>Loading data…</span>
            </div>
          )}
          {!loading && !error && (
            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-gray-100/95 backdrop-blur border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 pl-6 font-semibold text-gray-800">URL</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-800">Category</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-800">Traffic (%)</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-800">Number of Keywords</th>
                    <th className="text-right py-4 pr-6 font-semibold text-gray-800">Traffic</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-16 text-center text-gray-500">
                        No data for this brand.
                      </td>
                    </tr>
                  ) : (
                    rows.map((row, i) => (
                      <tr
                        key={`${selectedBrand}-${row.url}-${i}`}
                        className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/40 transition-colors`}
                      >
                        <td className="py-4 pl-6">
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-700 hover:underline max-w-md truncate"
                          >
                            <span className="truncate">{row.url.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
                          </a>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200/80">
                            {row.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right tabular-nums font-medium text-gray-800">{row.trafficPct}%</td>
                        <td className="py-4 px-4 text-right tabular-nums text-gray-700">{row.numKeywords.toLocaleString()}</td>
                        <td className="py-4 pr-6 text-right tabular-nums font-semibold text-gray-900">{row.traffic.toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
