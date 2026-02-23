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
import { Target, Layers, FileText, Network } from 'lucide-react';

// 1. Query Intent Mapping
const queryIntentData = [
  { intent: 'Informational (learn)', mahindra: 34, shriram: 46, muthoot: 21, geoImpact: 'AI answer source' },
  { intent: 'Comparative (best vs others)', mahindra: 12, shriram: 18, muthoot: 6, geoImpact: 'Consideration phase' },
  { intent: 'Eligibility / Process', mahindra: 21, shriram: 19, muthoot: 9, geoImpact: 'High AI citation' },
  { intent: 'Calculator / Tools', mahindra: 8, shriram: 11, muthoot: 5, geoImpact: 'Mid-funnel' },
  { intent: 'Pure Transactional', mahindra: 25, shriram: 6, muthoot: 59, geoImpact: '-' },
];

const intentChartData = queryIntentData.map((row) => ({
  name: row.intent.split(' (')[0].slice(0, 18) + (row.intent.length > 18 ? '…' : ''),
  fullName: row.intent,
  Mahindra: row.mahindra,
  Shriram: row.shriram,
  Muthoot: row.muthoot,
}));

// 2. Topic Cluster Depth Analysis
const topicClusterData = [
  { cluster: 'Gold Loan Education', mahindra: 18, shriram: 64, muthoot: 9, maturity: 'Weak' },
  { cluster: 'Loan Interest Calculation', mahindra: 22, shriram: 51, muthoot: 7, maturity: 'Weak' },
  { cluster: 'Eligibility & Documentation', mahindra: 31, shriram: 48, muthoot: 11, maturity: 'Weak' },
  { cluster: 'MSME / Business Loans', mahindra: 44, shriram: 72, muthoot: 13, maturity: 'Very Weak' },
  { cluster: 'Rural / Tractor Finance', mahindra: 63, shriram: 41, muthoot: 4, maturity: 'Missing' },
  { cluster: 'Loan Against Property (Guides)', mahindra: 28, shriram: 39, muthoot: 6, maturity: 'Weak' },
  { cluster: 'Financial Literacy / FAQs', mahindra: 96, shriram: 210, muthoot: 18, maturity: 'Very Weak' },
];

const clusterChartData = topicClusterData.map((r) => ({
  name: r.cluster.length > 24 ? r.cluster.slice(0, 24) + '…' : r.cluster,
  fullName: r.cluster,
  Mahindra: r.mahindra,
  Shriram: r.shriram,
  Muthoot: r.muthoot,
}));

// 3. Content Depth & Explainability
const contentDepthData = [
  { metric: 'Avg Word Count (Top Pages)', mahindra: '820', shriram: '1,450', muthoot: '640', signal: 'Low context' },
  { metric: 'Pages ≥1,500 words (%)', mahindra: '6.50%', shriram: '21%', muthoot: '3.10%', signal: 'Poor explainability' },
  { metric: 'Pages with Step-by-Step Sections', mahindra: '41%', shriram: '68%', muthoot: '19%', signal: 'AI-friendly structure' },
  { metric: 'Pages with Examples / Scenarios', mahindra: '28%', shriram: '52%', muthoot: '11%', signal: 'Weak reasoning' },
  { metric: 'Pages with Visual Aids / Tables', mahindra: '33%', shriram: '61%', muthoot: '14%', signal: 'Reduced comprehension' },
  { metric: 'Explainability Score (0–10)', mahindra: 4.3, shriram: 8.7, muthoot: 3.2, signal: 'GEO readiness' },
];

const explainabilityScores = [
  { brand: 'Mahindra', score: 4.3, gradient: 'linear-gradient(to right, #3B82F6, #2563EB)', cardClass: 'bg-blue-50', textClass: 'text-blue-700' },
  { brand: 'Shriram', score: 8.7, gradient: 'linear-gradient(to right, #10B981, #059669)', cardClass: 'bg-emerald-50', textClass: 'text-emerald-700' },
  { brand: 'Muthoot', score: 3.2, gradient: 'linear-gradient(to right, #F59E0B, #D97706)', cardClass: 'bg-amber-50', textClass: 'text-amber-700' },
];

// 4. Entity & Semantic Coverage
const entityCoverageData = [
  { metric: 'Avg Entities per Page', mahindra: 6.4, shriram: 9.2, muthoot: 3.1, why: 'Entity density' },
  { metric: 'Financial Entities Covered', mahindra: 720, shriram: 2840, muthoot: 420, why: 'Knowledge graph' },
  { metric: 'Location Entities (branches, regions)', mahindra: 410, shriram: 1220, muthoot: 280, why: 'Local AI answers' },
  { metric: 'Policy / Regulation Mentions', mahindra: 190, shriram: 460, muthoot: 72, why: 'Trust & authority' },
  { metric: 'Schema-backed Entities (%)', mahindra: '21%', shriram: '72%', muthoot: '9%', why: 'Machine readability' },
  { metric: 'Entity Completeness Index (0–100)', mahindra: 48, shriram: 86, muthoot: 27, why: 'GEO metric' },
];

const entityChartData = [
  { brand: 'Mahindra', entities: 6.4, completeness: 48 },
  { brand: 'Shriram', entities: 9.2, completeness: 86 },
  { brand: 'Muthoot', entities: 3.1, completeness: 27 },
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

function maturityBadge(maturity: string) {
  const styles: Record<string, string> = {
    Weak: 'bg-amber-50 text-amber-700 border border-amber-200/80',
    'Very Weak': 'bg-orange-50 text-orange-700 border border-orange-200/80',
    Missing: 'bg-rose-50 text-rose-700 border border-rose-200/80',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg ${styles[maturity] || 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
      {maturity}
    </span>
  );
}

export default function ContentIntelligencePage() {
  return (
    <div className="space-y-10 p-6 bg-gradient-to-b from-gray-50/80 to-white min-h-screen">
      {/* Page header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 px-8 py-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),transparent)]" />
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight">Content Intelligence</h1>
          <p className="mt-2 text-slate-300 text-lg">Query intent, topic clusters, content depth, and entity coverage for GEO</p>
        </div>
      </div>

      {/* 1. Query Intent Mapping */}
      <section className="rounded-2xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Query Intent Mapping</h2>
              <p className="text-sm text-blue-100">Intent mix by brand and GEO impact</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-8">
          <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-gray-50/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-200">
                  <th className="text-left py-4 pl-5 font-semibold text-gray-800">Intent Type</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Mahindra</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Shriram</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Muthoot</th>
                  <th className="text-left py-4 pr-5 font-semibold text-gray-800">GEO Impact</th>
                </tr>
              </thead>
              <tbody>
                {queryIntentData.map((row, i) => (
                  <tr key={row.intent} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-blue-50/40 transition-colors`}>
                    <td className="py-3.5 pl-5 font-medium text-gray-900">{row.intent}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{row.mahindra}%</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{row.shriram}%</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{row.muthoot}%</td>
                    <td className="py-3.5 pr-5 text-gray-600 text-sm">{row.geoImpact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-80 rounded-xl border border-gray-200/80 bg-white p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intentChartData} layout="vertical" margin={{ top: 8, right: 24, left: 128, bottom: 8 }}>
                <defs>
                  <linearGradient id="intentMahindra" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient>
                  <linearGradient id="intentShriram" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#34D399" /><stop offset="100%" stopColor="#059669" /></linearGradient>
                  <linearGradient id="intentMuthoot" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#FBBF24" /><stop offset="100%" stopColor="#D97706" /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                <XAxis type="number" domain={[0, 60]} tick={{ fontSize: 11, fill: '#6B7280' }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#374151', fontWeight: 500 }} width={124} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v}%`, '']} labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName} />
                <Legend wrapperStyle={{ paddingTop: 12 }} iconType="circle" iconSize={10} formatter={(v) => <span className="text-sm font-medium text-gray-600">{v}</span>} />
                <Bar dataKey="Mahindra" fill="url(#intentMahindra)" radius={[0, 6, 6, 0]} stackId="a" />
                <Bar dataKey="Shriram" fill="url(#intentShriram)" radius={[0, 6, 6, 0]} stackId="a" />
                <Bar dataKey="Muthoot" fill="url(#intentMuthoot)" radius={[0, 6, 6, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 2. Topic Cluster Depth Analysis */}
      <section className="rounded-2xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Topic Cluster Depth Analysis</h2>
              <p className="text-sm text-emerald-100">Page count by cluster and cluster maturity</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-8">
          <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-gray-50/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-200">
                  <th className="text-left py-4 pl-5 font-semibold text-gray-800">Topic Cluster</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Mahindra</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Shriram</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-800">Muthoot</th>
                  <th className="text-left py-4 pr-5 font-semibold text-gray-800">Maturity</th>
                </tr>
              </thead>
              <tbody>
                {topicClusterData.map((row, i) => (
                  <tr key={row.cluster} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-emerald-50/40 transition-colors`}>
                    <td className="py-3.5 pl-5 font-medium text-gray-900">{row.cluster}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{row.mahindra}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{row.shriram}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{row.muthoot}</td>
                    <td className="py-3.5 pr-5">{maturityBadge(row.maturity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="min-h-[28rem] rounded-xl border border-gray-200/80 bg-white p-6">
            <ResponsiveContainer width="100%" height={440}>
              <BarChart data={clusterChartData} margin={{ top: 24, right: 32, left: 16, bottom: 120 }}>
                <defs>
                  <linearGradient id="clusterMahindra" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#3B82F6" /><stop offset="100%" stopColor="#60A5FA" /></linearGradient>
                  <linearGradient id="clusterShriram" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#059669" /><stop offset="100%" stopColor="#34D399" /></linearGradient>
                  <linearGradient id="clusterMuthoot" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#D97706" /><stop offset="100%" stopColor="#FBBF24" /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="name" angle={-35} textAnchor="end" height={110} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} width={40} />
                <Tooltip {...tooltipStyle} labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName} />
                <Legend wrapperStyle={{ paddingTop: 16 }} iconType="circle" iconSize={10} formatter={(v) => <span className="text-sm font-medium text-gray-600">{v}</span>} />
                <Bar dataKey="Mahindra" fill="url(#clusterMahindra)" radius={[6, 6, 0, 0]} maxBarSize={48} />
                <Bar dataKey="Shriram" fill="url(#clusterShriram)" radius={[6, 6, 0, 0]} maxBarSize={48} />
                <Bar dataKey="Muthoot" fill="url(#clusterMuthoot)" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 3. Content Depth & Explainability */}
      <section className="rounded-2xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Content Depth & Explainability</h2>
              <p className="text-sm text-amber-100">AI consumption signals and GEO readiness</p>
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
                  <th className="text-left py-4 pr-5 font-semibold text-gray-800">GEO Signal</th>
                </tr>
              </thead>
              <tbody>
                {contentDepthData.map((row, i) => (
                  <tr key={row.metric} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-amber-50/40 transition-colors`}>
                    <td className="py-3.5 pl-5 font-medium text-gray-900">{row.metric}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{typeof row.mahindra === 'number' ? row.mahindra : row.mahindra}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{typeof row.shriram === 'number' ? row.shriram : row.shriram}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{typeof row.muthoot === 'number' ? row.muthoot : row.muthoot}</td>
                    <td className="py-3.5 pr-5 text-gray-600 text-sm">{row.signal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-4">Explainability Score (0–10)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {explainabilityScores.map(({ brand, score, gradient, cardClass, textClass }) => (
                <div key={brand} className={`rounded-2xl border border-gray-200/80 overflow-hidden ${cardClass}`}>
                  <div className="p-5">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{brand}</p>
                    <p className={`text-3xl font-bold tabular-nums ${textClass}`}>{score}</p>
                    <div className="mt-3 h-2.5 w-full rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(score / 10) * 100}%`, background: gradient }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">out of 10</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Entity & Semantic Coverage */}
      <section className="rounded-2xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Network className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Entity & Semantic Coverage</h2>
              <p className="text-sm text-violet-100">Advanced GEO signals and why AI cares</p>
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
                  <th className="text-left py-4 pr-5 font-semibold text-gray-800">Why AI Cares</th>
                </tr>
              </thead>
              <tbody>
                {entityCoverageData.map((row, i) => (
                  <tr key={row.metric} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-violet-50/40 transition-colors`}>
                    <td className="py-3.5 pl-5 font-medium text-gray-900">{row.metric}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">
                      {typeof row.mahindra === 'number' ? row.mahindra.toLocaleString() : row.mahindra}
                    </td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">
                      {typeof row.shriram === 'number' ? row.shriram.toLocaleString() : row.shriram}
                    </td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">
                      {typeof row.muthoot === 'number' ? row.muthoot.toLocaleString() : row.muthoot}
                    </td>
                    <td className="py-3.5 pr-5 text-gray-600 text-sm">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-gray-200/80 bg-white p-5">
              <p className="text-sm font-semibold text-gray-800 mb-4">Avg Entities per Page</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={entityChartData} layout="vertical" margin={{ left: 8, right: 24 }}>
                  <defs>
                    <linearGradient id="entityBar" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#7C3AED" /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                  <XAxis type="number" domain={[0, 12]} tick={{ fontSize: 11, fill: '#6B7280' }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
                  <YAxis type="category" dataKey="brand" width={72} tick={{ fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="entities" name="Entities/page" fill="url(#entityBar)" radius={[0, 6, 6, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-xl border border-gray-200/80 bg-white p-5">
              <p className="text-sm font-semibold text-gray-800 mb-4">Entity Completeness Index (0–100)</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={entityChartData} layout="vertical" margin={{ left: 8, right: 24 }}>
                  <defs>
                    <linearGradient id="completeBar" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#22D3EE" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#6B7280' }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
                  <YAxis type="category" dataKey="brand" width={72} tick={{ fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="completeness" name="Completeness" fill="url(#completeBar)" radius={[0, 6, 6, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
