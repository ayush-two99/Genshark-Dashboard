'use client';

import React, { useState, useEffect } from 'react';
import { Search, BarChart3, List } from 'lucide-react';

const clusterSearchVolume = [
  { cluster: 'Car', searchVolume: 212220 },
  { cluster: 'Finance', searchVolume: 278470 },
  { cluster: 'Loan', searchVolume: 2705840 },
  { cluster: 'Tractor', searchVolume: 20810 },
  { cluster: 'Grand Total', searchVolume: 3217340 },
];

type KeywordRow = { keyword: string; cluster: string; searchVolume: number };

export default function KeywordsClusterPage() {
  const [keywordData, setKeywordData] = useState<KeywordRow[]>([]);
  const [keywordSearch, setKeywordSearch] = useState('');
  const [keywordClusterFilter, setKeywordClusterFilter] = useState<string>('all');
  const [keywordLoading, setKeywordLoading] = useState(true);

  useEffect(() => {
    fetch('/api/keywords-cluster-keywords')
      .then((res) => res.ok ? res.json() : [])
      .then((data: KeywordRow[]) => {
        setKeywordData(Array.isArray(data) ? data : []);
        setKeywordLoading(false);
      })
      .catch(() => {
        setKeywordData([]);
        setKeywordLoading(false);
      });
  }, []);

  const filteredKeywords = keywordData.filter((row) => {
    const matchSearch = !keywordSearch || row.keyword.toLowerCase().includes(keywordSearch.toLowerCase());
    const matchCluster = keywordClusterFilter === 'all' || row.cluster === keywordClusterFilter;
    return matchSearch && matchCluster;
  });

  const clusters = Array.from(new Set(keywordData.map((r) => r.cluster))).sort();

  return (
    <div className="space-y-6 p-6">
      {/* Cluster Search Volume */}
      <div className="rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Cluster search volume</h2>
              <p className="text-sm text-indigo-100">SUM of search volume by cluster</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100/80 border-b border-gray-200">
                <th className="text-left py-4 pl-6 font-semibold text-gray-800">Cluster</th>
                <th className="text-right py-4 pr-6 font-semibold text-gray-800">SUM of Search Volume</th>
              </tr>
            </thead>
            <tbody>
              {clusterSearchVolume.map((row, i) => (
                <tr
                  key={row.cluster}
                  className={`border-b border-gray-100 last:border-0 ${
                    row.cluster === 'Grand Total'
                      ? 'bg-indigo-50/50 font-semibold'
                      : i % 2 === 0
                        ? 'bg-white'
                        : 'bg-gray-50/30'
                  } hover:bg-indigo-50/30 transition-colors`}
                >
                  <td className="py-3.5 pl-6 font-medium text-gray-900">{row.cluster}</td>
                  <td className="py-3.5 pr-6 text-right tabular-nums font-medium text-gray-900">
                    {row.searchVolume.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Keywords by cluster */}
      <div className="rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <List className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Keywords by cluster</h2>
              <p className="text-sm text-emerald-100">Keyword, Cluster, Search Volume</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search keyword..."
              value={keywordSearch}
              onChange={(e) => setKeywordSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
          </div>
          <select
            value={keywordClusterFilter}
            onChange={(e) => setKeywordClusterFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
          >
            <option value="all">All clusters</option>
            {clusters.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="text-sm text-gray-500 self-center">
            {filteredKeywords.length.toLocaleString()} rows
          </span>
        </div>
        <div className="overflow-auto max-h-[480px]">
          {keywordLoading ? (
            <div className="p-8 text-center text-gray-500">Loading keyword data...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-100/95 border-b border-gray-200 z-10">
                <tr>
                  <th className="text-left py-3 pl-6 font-semibold text-gray-800">Keyword</th>
                  <th className="text-left py-3 font-semibold text-gray-800">Cluster</th>
                  <th className="text-right py-3 pr-6 font-semibold text-gray-800">Search Volume</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeywords.map((row, i) => (
                  <tr
                    key={`${row.keyword}-${row.cluster}-${i}`}
                    className={`border-b border-gray-100 last:border-0 ${
                      i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    } hover:bg-emerald-50/30 transition-colors`}
                  >
                    <td className="py-2.5 pl-6 text-gray-900">{row.keyword}</td>
                    <td className="py-2.5">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {row.cluster}
                      </span>
                    </td>
                    <td className="py-2.5 pr-6 text-right tabular-nums font-medium text-gray-900">
                      {row.searchVolume.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {!keywordLoading && filteredKeywords.length === 0 && (
          <div className="p-6 text-center text-gray-500">No keywords match your filters.</div>
        )}
      </div>
    </div>
  );
}
