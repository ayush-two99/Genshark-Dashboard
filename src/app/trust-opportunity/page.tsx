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
} from 'recharts';
import { Shield, Map } from 'lucide-react';

// 1. Content Trust & Compliance Signals (Finance Specific)
const trustData = [
  { metric: 'Pages with Author Attribution', mahindra: 42, shriram: 71, muthoot: 18, signal: 'E-E-A-T' },
  { metric: 'Pages with Update Timestamps', mahindra: 38, shriram: 69, muthoot: 21, signal: 'Freshness' },
  { metric: 'Regulatory Disclaimers Present', mahindra: 91, shriram: 96, muthoot: 63, signal: 'Compliance' },
  { metric: 'FAQs Answering "Risk / Eligibility"', mahindra: 64, shriram: 88, muthoot: 27, signal: 'Responsible info' },
  { metric: 'Content Trust Index (0–100)', mahindra: 61, shriram: 87, muthoot: 39, signal: 'GEO trust' },
];

const trustIndexData = [
  { brand: 'Mahindra', index: 61 },
  { brand: 'Shriram', index: 87 },
  { brand: 'Muthoot', index: 39 },
];

// 2. GEO Opportunity Gap
const opportunityData = [
  { contentType: '"How Gold Loan Works" Guides', shriram: 'Yes (12)', mahindra: 'Yes (8)', muthoot: 'No', opportunity: 'Top AI query' },
  { contentType: 'Interest Rate Explainers', shriram: 'Yes (9)', mahindra: 'Yes (6)', muthoot: 'Minimal (2)', opportunity: 'High search' },
  { contentType: 'Eligibility Scenarios', shriram: 'Yes', mahindra: 'Partial', muthoot: 'No', opportunity: 'AI favours scenarios' },
  { contentType: 'Comparison Pages', shriram: 'Yes', mahindra: 'Partial', muthoot: 'No', opportunity: 'Consideration' },
  { contentType: 'Financial Literacy Hub', shriram: 'Yes', mahindra: 'Yes', muthoot: 'No', opportunity: 'Authority' },
  { contentType: 'Rural / Farmer Education', shriram: 'Partial', mahindra: 'Yes', muthoot: 'No', opportunity: 'Niche authority' },
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

function opportunityCell(value: string) {
  const v = value.toLowerCase();
  if (v === 'yes' || value.startsWith('Yes (')) return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200/80">{value}</span>;
  if (v === 'partial' || value.startsWith('Partial')) return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-sm font-medium border border-amber-200/80">{value}</span>;
  if (v === 'no') return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-sm font-medium border border-rose-200/80">No</span>;
  if (v.startsWith('minimal')) return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 text-sm font-medium border border-orange-200/80">{value}</span>;
  return <span className="text-gray-700">{value}</span>;
}

export default function TrustOpportunityPage() {
  return (
    <div className="space-y-10 p-6 bg-gradient-to-b from-gray-50/80 to-white min-h-screen">
      {/* Page header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 px-8 py-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(100,116,139,0.3),transparent)]" />
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight">Trust & Opportunity</h1>
          <p className="mt-2 text-slate-200 text-lg">Content trust & compliance signals, GEO opportunity gap</p>
        </div>
      </div>

      {/* 1. Content Trust & Compliance Signals */}
      <section className="rounded-2xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Content Trust & Compliance Signals</h2>
              <p className="text-sm text-slate-200">Finance-specific E-E-A-T, freshness, compliance & trust index</p>
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
                  <th className="text-left py-4 pr-5 font-semibold text-gray-800">Trust Signal</th>
                </tr>
              </thead>
              <tbody>
                {trustData.map((row, i) => (
                  <tr key={row.metric} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-slate-50/50 transition-colors`}>
                    <td className="py-3.5 pl-5 font-medium text-gray-900">{row.metric}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{row.metric.includes('Index') ? row.mahindra : `${row.mahindra}%`}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{row.metric.includes('Index') ? row.shriram : `${row.shriram}%`}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-700">{row.metric.includes('Index') ? row.muthoot : `${row.muthoot}%`}</td>
                    <td className="py-3.5 pr-5 text-gray-600 text-sm">{row.signal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-gray-200/80 bg-white p-5">
            <p className="text-sm font-semibold text-gray-800 mb-4">Content Trust Index (0–100)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={trustIndexData} layout="vertical" margin={{ left: 8, right: 24 }}>
                <defs>
                  <linearGradient id="trustBar" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#64748B" /><stop offset="100%" stopColor="#475569" /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis type="category" dataKey="brand" width={72} tick={{ fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => [v, 'Trust Index']} />
                <Bar dataKey="index" name="Trust Index" fill="url(#trustBar)" radius={[0, 6, 6, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 2. GEO Opportunity Gap */}
      <section className="rounded-2xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Map className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">GEO Opportunity Gap</h2>
              <p className="text-sm text-indigo-100">What competitors have that Muthoot lacks</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-gray-50/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-200">
                  <th className="text-left py-4 pl-5 font-semibold text-gray-800">Content Type</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Shriram</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Mahindra</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Muthoot</th>
                  <th className="text-left py-4 pr-5 font-semibold text-gray-800">Missed Opportunity</th>
                </tr>
              </thead>
              <tbody>
                {opportunityData.map((row, i) => (
                  <tr key={row.contentType} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-indigo-50/30 transition-colors`}>
                    <td className="py-3.5 pl-5 font-medium text-gray-900">{row.contentType}</td>
                    <td className="py-3.5 px-4">{opportunityCell(row.shriram)}</td>
                    <td className="py-3.5 px-4">{opportunityCell(row.mahindra)}</td>
                    <td className="py-3.5 px-4">{opportunityCell(row.muthoot)}</td>
                    <td className="py-3.5 pr-5 text-gray-600 text-sm">{row.opportunity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
