'use client';

import React, { useMemo, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/services/api';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { Search, Filter, Play, Pause, Flag, TrendingUp } from 'lucide-react';

type Experiment = {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'draft';
  conversionRate: number;
  visitors?: number;
  startDate?: string;
  endDate?: string;
};

const funnelData = [
  { stage: 'Views', value: 12000 },
  { stage: 'Clicks', value: 5400 },
  { stage: 'Reads', value: 3200 },
  { stage: 'Signups', value: 980 },
  { stage: 'Purchases', value: 420 },
];

export default function ExperimentsPage() {
  const { data, loading, error } = useFetch<Experiment[]>(api.getExperiments);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'running' | 'completed' | 'draft'>('all');
  const experiments = data ?? [];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return experiments
      .filter(e => e.name.toLowerCase().includes(q))
      .filter(e => status === 'all' ? true : e.status === status)
      .sort((a, b) => (b.conversionRate ?? 0) - (a.conversionRate ?? 0));
  }, [experiments, query, status]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Experiments</h1>
          <p className="text-gray-600 mt-1">Track funnels, A/B tests, and performance</p>
        </div>
      </div>

      {/* Funnel */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Acquisition Funnel</h3>
          <span className="text-sm text-gray-600">Last 30 days</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={funnelData} layout="vertical" barSize={22}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="stage" type="category" tick={{ fontSize: 12 }} width={90} />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: 8 }} />
            <Bar dataKey="value" fill="#3B82F6" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search experiments..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All statuses</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Experiments Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && (
                <tr><td colSpan={6} className="px-6 py-4 text-sm text-gray-500">Loading…</td></tr>
              )}
              {error && (
                <tr><td colSpan={6} className="px-6 py-4 text-sm text-red-600">Failed to load</td></tr>
              )}
              {filtered.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{exp.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      exp.status === 'running' ? 'bg-green-100 text-green-700' :
                      exp.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {exp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-900">{exp.conversionRate}%</span>
                      <TrendingUp className="w-4 h-4 text-emerald-600 ml-2" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exp.visitors ?? '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.startDate ? new Date(exp.startDate).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.endDate ? new Date(exp.endDate).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


