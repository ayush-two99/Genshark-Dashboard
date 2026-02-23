'use client';

import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Eye, MessageSquare, FileText } from 'lucide-react';
import KPICard from '@/components/ui/KPICard';

// Brand comparison: numeric values for charting (Volume, Backlinks, Traffic)
const brandComparisonData = [
  { brand: 'Mahindra Finance', volume: 334100, backlinks: 21600, traffic: 266200 },
  { brand: 'Shriram Finance', volume: 1300000, backlinks: 83900, traffic: 2000000 },
  { brand: 'L&T Finance', volume: 1200000, backlinks: 18600, traffic: 515700 },
  { brand: 'TATA Capital', volume: 1300000, backlinks: 422600, traffic: 881300 },
  { brand: 'Bajaj Finserv', volume: 2400000, backlinks: 747000, traffic: 42200000 },
  { brand: 'Muthoot Finance', volume: 1500000, backlinks: 331000, traffic: 2500000 },
  { brand: 'Piramal Finance', volume: 890600, backlinks: 24100, traffic: 890600 },
];

// AI Visibility by brand (different chart type)
const aiVisibilityData = [
  { brand: 'Mahindra Finance', visibility: 33, mentions: 700, citedPages: 392 },
  { brand: 'Shriram Finance', visibility: 66, mentions: 6300, citedPages: 5300 },
  { brand: 'L&T Finance', visibility: 51, mentions: 1000, citedPages: 497 },
  { brand: 'TATA Capital', visibility: 62, mentions: 5800, citedPages: 3700 },
  { brand: 'Bajaj Finserv', visibility: 65, mentions: 129200, citedPages: 103300 },
  { brand: 'Muthoot Finance', visibility: 70, mentions: 3700, citedPages: 1400 },
  { brand: 'Piramal Finance', visibility: 55, mentions: 3100, citedPages: 2600 },
];

const pagesTableData = [
  { brand: 'Mahindra Finance', totalTopPages: 2659, totalBlogs: 564, totalNonBlogs: 1885, informationalPages: 210 },
  { brand: 'Muthoot Finance', totalTopPages: 7960, totalBlogs: 652, totalNonBlogs: 5953, informationalPages: 1355 },
  { brand: 'Piramal Finance', totalTopPages: 2938, totalBlogs: 66, totalNonBlogs: 2221, informationalPages: 653 },
  { brand: 'Sriram Finance', totalTopPages: 20469, totalBlogs: 1157, totalNonBlogs: 16195, informationalPages: 3117 },
];

function formatCompact(num: number): string {
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(num);
}

export default function HomePage() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Visibility Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your AI brand mentions across LLM platforms</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Export Report</button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Settings</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard title="AI Visibility" value="33" icon={<Eye className="w-8 h-8" />} color="blue" />
        <KPICard title="Mentions" value="700" icon={<MessageSquare className="w-8 h-8" />} color="green" />
        <KPICard title="Cited Pages" value="392" icon={<FileText className="w-8 h-8" />} color="yellow" />
      </div>

      {/* AI Visibility chart - horizontal layout (different from vertical brand comparison below) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm overflow-hidden">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">AI Visibility by brand</h3>
          <p className="text-sm text-gray-500 mt-0.5">Visibility score, mentions, and cited pages across brands</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-3">Visibility score (0–100)</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                layout="vertical"
                data={aiVisibilityData}
                margin={{ top: 8, right: 24, left: 80, bottom: 8 }}
                barCategoryGap="12%"
                barGap={4}
              >
                <defs>
                  <linearGradient id="barVisibility" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#6B7280' }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis type="category" dataKey="brand" tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }} width={76} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)' }}
                  formatter={(value: number) => [value, 'Score']}
                  labelFormatter={(label) => label}
                />
                <Bar dataKey="visibility" name="AI Visibility" fill="url(#barVisibility)" radius={[0, 4, 4, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-3">Mentions & cited pages</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                layout="vertical"
                data={aiVisibilityData}
                margin={{ top: 8, right: 24, left: 80, bottom: 8 }}
                barCategoryGap="12%"
                barGap={6}
              >
                <defs>
                  <linearGradient id="barMentions" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6EE7B7" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient id="barCited" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FCD34D" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6B7280' }} tickFormatter={(v) => formatCompact(v)} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis type="category" dataKey="brand" tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }} width={76} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)' }}
                  formatter={(value: number, name: string) => [formatCompact(value), name]}
                  labelFormatter={(label) => label}
                />
                <Legend wrapperStyle={{ paddingTop: 8 }} iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs font-medium text-gray-600">{v}</span>} />
                <Bar dataKey="mentions" name="Mentions" fill="url(#barMentions)" radius={[0, 4, 4, 0]} maxBarSize={22} />
                <Bar dataKey="citedPages" name="Cited Pages" fill="url(#barCited)" radius={[0, 4, 4, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm overflow-hidden">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Brand comparison</h3>
          <p className="text-sm text-gray-500 mt-0.5">Brand keywords volume, backlinks, and traffic</p>
        </div>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={brandComparisonData}
            margin={{ top: 24, right: 72, left: 28, bottom: 88 }}
            barCategoryGap="20%"
            barGap={8}
          >
            <defs>
              <linearGradient id="barVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.85} />
              </linearGradient>
              <linearGradient id="barBacklinks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity={1} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.85} />
              </linearGradient>
              <linearGradient id="barTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A78BFA" stopOpacity={1} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.85} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="brand"
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              angle={-32}
              textAnchor="end"
              height={84}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickFormatter={(v) => formatCompact(v)}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickFormatter={(v) => formatCompact(v)}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip
              cursor={{ fill: '#F9FAFB', radius: 8 }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)',
                padding: '14px 18px',
              }}
              formatter={(value: number, name: string) => [formatCompact(value), name]}
              labelFormatter={(label) => (
                <span className="font-semibold text-gray-900 text-sm">{label}</span>
              )}
              labelStyle={{ marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #F3F4F6' }}
              itemStyle={{ paddingTop: 4, paddingBottom: 2 }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 16 }}
              iconType="circle"
              iconSize={10}
              formatter={(value) => <span className="text-sm font-medium text-gray-600">{value}</span>}
              align="center"
              verticalAlign="bottom"
              layout="horizontal"
            />
            <Bar
              yAxisId="left"
              dataKey="volume"
              name="Brand Keywords Volume"
              fill="url(#barVolume)"
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
            />
            <Bar
              yAxisId="left"
              dataKey="backlinks"
              name="Backlinks"
              fill="url(#barBacklinks)"
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
            />
            <Bar
              yAxisId="right"
              dataKey="traffic"
              name="Traffic"
              fill="url(#barTraffic)"
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm overflow-hidden">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Pages overview</h3>
          <p className="text-sm text-gray-500 mt-0.5">Total top pages, blogs, non-blogs, and informational pages by brand</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 pr-6 font-semibold text-gray-900">Brand Name</th>
                <th className="pb-3 pr-6 font-semibold text-gray-900 text-right">Total Top Pages</th>
                <th className="pb-3 pr-6 font-semibold text-gray-900 text-right">Total Blogs</th>
                <th className="pb-3 pr-6 font-semibold text-gray-900 text-right">Total Non-Blogs</th>
                <th className="pb-3 font-semibold text-gray-900 text-right">Informational Pages</th>
              </tr>
            </thead>
            <tbody>
              {pagesTableData.map((row, i) => (
                <tr key={row.brand} className={i < pagesTableData.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="py-4 pr-6 font-medium text-gray-900">{row.brand}</td>
                  <td className="py-4 pr-6 text-gray-700 text-right tabular-nums">{row.totalTopPages.toLocaleString()}</td>
                  <td className="py-4 pr-6 text-gray-700 text-right tabular-nums">{row.totalBlogs.toLocaleString()}</td>
                  <td className="py-4 pr-6 text-gray-700 text-right tabular-nums">{row.totalNonBlogs.toLocaleString()}</td>
                  <td className="py-4 text-gray-700 text-right tabular-nums">{row.informationalPages.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
