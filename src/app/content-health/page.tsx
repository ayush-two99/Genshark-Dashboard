'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Quote, RefreshCw } from 'lucide-react';

// 1. AI Citation Breadth & Stability
const citationData = [
  { metric: 'AI Mentions (sampled prompts)', mahindra: 700, shriram: 6300, muthoot: 3700, interpretation: 'Brand recall' },
  { metric: 'Unique URLs Cited by AI', mahindra: 392, shriram: 5300, muthoot: 1400, interpretation: 'Breadth problem' },
  { metric: 'AI Citation Concentration', mahindra: 'Medium', shriram: 'Low', muthoot: 'Very High', interpretation: 'Fragile' },
  { metric: '% Pages Used as AI Sources', mahindra: '4.80%', shriram: '18.40%', muthoot: '3.20%', interpretation: 'Low scalability' },
  { metric: 'Citation Stability (retests)', mahindra: 'Medium', shriram: 'High', muthoot: 'Low', interpretation: 'Volatile presence' },
];

const citationChartData = [
  { brand: 'Mahindra', mentions: 700, urls: 392 },
  { brand: 'Shriram', mentions: 6300, urls: 5300 },
  { brand: 'Muthoot', mentions: 3700, urls: 1400 },
];

const citationPctData = [
  { brand: 'Mahindra', value: 4.8 },
  { brand: 'Shriram', value: 18.4 },
  { brand: 'Muthoot', value: 3.2 },
];

// 2. Content Freshness & Velocity
const freshnessData = [
  { metric: 'Avg Months Since Update', mahindra: 11, shriram: 4, muthoot: 22, geoImpact: 'Outdated info' },
  { metric: 'Pages Updated Last 90 Days (%)', mahindra: '18%', shriram: '46%', muthoot: '7%', geoImpact: 'Low velocity' },
  { metric: 'Evergreen Content Refresh Cycle', mahindra: 'Annual', shriram: 'Quarterly', muthoot: 'Ad-hoc', geoImpact: 'Inconsistent' },
  { metric: 'New Informational Pages / Month', mahindra: 24, shriram: 110, muthoot: 8, geoImpact: 'Slow expansion' },
  { metric: 'Freshness Score (0–10)', mahindra: 4.9, shriram: 8.4, muthoot: 2.6, geoImpact: 'AI decay risk' },
];

const freshnessScoreCards = [
  { brand: 'Mahindra', score: 4.9, gradient: 'linear-gradient(to right, #3B82F6, #2563EB)', cardClass: 'bg-blue-50', textClass: 'text-blue-700' },
  { brand: 'Shriram', score: 8.4, gradient: 'linear-gradient(to right, #10B981, #059669)', cardClass: 'bg-emerald-50', textClass: 'text-emerald-700' },
  { brand: 'Muthoot', score: 2.6, gradient: 'linear-gradient(to right, #F59E0B, #D97706)', cardClass: 'bg-amber-50', textClass: 'text-amber-700' },
];

const freshnessChartData = [
  { brand: 'Mahindra', monthsSinceUpdate: 11, newPagesPerMonth: 24, pagesUpdated90d: 18 },
  { brand: 'Shriram', monthsSinceUpdate: 4, newPagesPerMonth: 110, pagesUpdated90d: 46 },
  { brand: 'Muthoot', monthsSinceUpdate: 22, newPagesPerMonth: 8, pagesUpdated90d: 7 },
];

const tooltipStyle = {
  contentStyle: {
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
    padding: '12px 16px',
  },
};

function stabilityBadge(value: string) {
  const v = value.toLowerCase();
  const styles: Record<string, string> = {
    low: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    medium: 'bg-amber-50 text-amber-700 border border-amber-200/80',
    high: 'bg-blue-50 text-blue-700 border border-blue-200/80',
    'very high': 'bg-rose-50 text-rose-700 border border-rose-200/80',
  };
  const key = v in styles ? v : 'medium';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg ${styles[key] || 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
      {value}
    </span>
  );
}

export default function ContentHealthPage() {
  return (
    <div className="space-y-10 p-6 bg-gradient-to-b from-gray-50/80 to-white min-h-screen">
      {/* Page header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-800 px-8 py-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(45,212,191,0.2),transparent)]" />
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight">Content Health</h1>
          <p className="mt-2 text-teal-100 text-lg">AI citation breadth & stability, content freshness & velocity</p>
        </div>
      </div>

      {/* 1. AI Citation Breadth & Stability */}
      <section className="rounded-2xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Quote className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Citation Breadth & Stability</h2>
              <p className="text-sm text-indigo-100">Brand recall, cited URLs, concentration & stability</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-8">
          <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-gray-50/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-200">
                  <th className="text-left py-4 pl-5 font-semibold text-gray-800">Metric</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Mahindra</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Shriram</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Muthoot</th>
                  <th className="text-left py-4 pr-5 font-semibold text-gray-800">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                {citationData.map((row, i) => (
                  <tr key={row.metric} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-indigo-50/40 transition-colors`}>
                    <td className="py-3.5 pl-5 font-medium text-gray-900">{row.metric}</td>
                    <td className="py-3.5 px-4 text-right">
                      {typeof row.mahindra === 'string' && ['Medium', 'Low', 'High', 'Very High'].includes(row.mahindra)
                        ? stabilityBadge(row.mahindra)
                        : <span className="tabular-nums text-gray-700">{row.mahindra}</span>}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {typeof row.shriram === 'string' && ['Medium', 'Low', 'High', 'Very High'].includes(row.shriram)
                        ? stabilityBadge(row.shriram)
                        : <span className="tabular-nums text-gray-700">{row.shriram}</span>}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {typeof row.muthoot === 'string' && ['Medium', 'Low', 'High', 'Very High'].includes(row.muthoot)
                        ? stabilityBadge(row.muthoot)
                        : <span className="tabular-nums text-gray-700">{row.muthoot}</span>}
                    </td>
                    <td className="py-3.5 pr-5 text-gray-600 text-sm">{row.interpretation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-gray-200/80 bg-white p-5">
              <p className="text-sm font-semibold text-gray-800 mb-4">AI Mentions & Unique URLs Cited</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={citationChartData} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
                  <defs>
                    <linearGradient id="citeMentions" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#6366F1" /><stop offset="100%" stopColor="#818CF8" /></linearGradient>
                    <linearGradient id="citeUrls" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#34D399" /><stop offset="100%" stopColor="#6EE7B7" /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="brand" tick={{ fontSize: 12, fontWeight: 500 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Legend />
                  <Bar dataKey="mentions" name="AI Mentions" fill="url(#citeMentions)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="urls" name="Unique URLs Cited" fill="url(#citeUrls)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-xl border border-gray-200/80 bg-white p-5">
              <p className="text-sm font-semibold text-gray-800 mb-4">% Pages Used as AI Sources</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={citationPctData} layout="vertical" margin={{ left: 8, right: 24 }}>
                  <defs>
                    <linearGradient id="citePct" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#7C3AED" /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                  <XAxis type="number" domain={[0, 25]} unit="%" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="brand" width={72} tick={{ fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v}%`, '']} />
                  <Bar dataKey="value" name="Pages as AI Sources %" fill="url(#citePct)" radius={[0, 6, 6, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Content Freshness & Velocity */}
      <section className="rounded-2xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <RefreshCw className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Content Freshness & Velocity</h2>
              <p className="text-sm text-teal-100">Update recency, refresh cycles, and expansion rate</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-8">
          <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-gray-50/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-200">
                  <th className="text-left py-4 pl-5 font-semibold text-gray-800">Metric</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Mahindra</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Shriram</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Muthoot</th>
                  <th className="text-left py-4 pr-5 font-semibold text-gray-800">GEO Impact</th>
                </tr>
              </thead>
              <tbody>
                {freshnessData.map((row, i) => (
                  <tr key={row.metric} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-teal-50/40 transition-colors`}>
                    <td className="py-3.5 pl-5 font-medium text-gray-900">{row.metric}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{typeof row.mahindra === 'number' ? row.mahindra : row.mahindra}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{typeof row.shriram === 'number' ? row.shriram : row.shriram}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{typeof row.muthoot === 'number' ? row.muthoot : row.muthoot}</td>
                    <td className="py-3.5 pr-5 text-gray-600 text-sm">{row.geoImpact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-4">Freshness Score (0–10)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {freshnessScoreCards.map(({ brand, score, gradient, cardClass, textClass }) => (
                <div key={brand} className={`rounded-2xl border border-gray-200/80 overflow-hidden ${cardClass}`}>
                  <div className="p-5">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{brand}</p>
                    <p className={`text-3xl font-bold tabular-nums ${textClass}`}>{score}</p>
                    <div className="mt-3 h-2.5 w-full rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(score / 10) * 100}%`, background: gradient }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">out of 10 · AI decay risk</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200/80 bg-white p-5">
            <p className="text-sm font-semibold text-gray-800 mb-4">Months Since Update & New Pages / Month</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={freshnessChartData} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
                <defs>
                  <linearGradient id="freshMonths" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#0D9488" /><stop offset="100%" stopColor="#2DD4BF" /></linearGradient>
                  <linearGradient id="freshNew" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#06B6D4" /><stop offset="100%" stopColor="#22D3EE" /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="brand" tick={{ fontSize: 12, fontWeight: 500 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Legend />
                <Bar yAxisId="left" dataKey="monthsSinceUpdate" name="Avg months since update" fill="url(#freshMonths)" radius={[6, 6, 0, 0]} />
                <Bar yAxisId="right" dataKey="newPagesPerMonth" name="New pages / month" fill="url(#freshNew)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl border border-gray-200/80 bg-white p-5">
            <p className="text-sm font-semibold text-gray-800 mb-4">Pages Updated Last 90 Days (%)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={freshnessChartData} layout="vertical" margin={{ left: 8, right: 24 }}>
                <defs>
                  <linearGradient id="fresh90" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#14B8A6" /><stop offset="100%" stopColor="#0D9488" /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" domain={[0, 60]} unit="%" />
                <YAxis type="category" dataKey="brand" width={72} tick={{ fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v}%`, '']} />
                <Bar dataKey="pagesUpdated90d" name="Updated last 90d %" fill="url(#fresh90)" radius={[0, 6, 6, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
