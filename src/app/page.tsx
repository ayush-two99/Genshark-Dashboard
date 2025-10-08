'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Target,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import KPICard from '@/components/ui/KPICard';

const visibilityData = [
  { date: '2024-12-15', visibility: 78, mentions: 2847, traffic: 18420 },
  { date: '2024-12-16', visibility: 81, mentions: 3124, traffic: 20150 },
  { date: '2024-12-17', visibility: 83, mentions: 3456, traffic: 22340 },
  { date: '2024-12-18', visibility: 85, mentions: 3789, traffic: 24560 },
  { date: '2024-12-19', visibility: 87, mentions: 4123, traffic: 26780 },
  { date: '2024-12-20', visibility: 89, mentions: 4456, traffic: 28990 },
  { date: '2024-12-21', visibility: 92, mentions: 4789, traffic: 31200 },
];

const engineData = [
  { name: 'ChatGPT', value: 42, color: '#10B981' },
  { name: 'Claude', value: 28, color: '#3B82F6' },
  { name: 'Perplexity', value: 15, color: '#8B5CF6' },
  { name: 'Gemini', value: 10, color: '#F59E0B' },
  { name: 'Copilot', value: 5, color: '#6B7280' },
];

const topPrompts = [
  { prompt: 'how to optimize AI prompts for better results', mentions: 1247, change: 18, source: 'AI Weekly' },
  { prompt: 'best AI tools for content creation 2024', mentions: 892, change: 12, source: 'TechCrunch' },
  { prompt: 'ChatGPT vs Claude comparison analysis', mentions: 756, change: -5, source: 'AI Research' },
  { prompt: 'AI productivity tools for developers', mentions: 634, change: 25, source: 'DevTools' },
  { prompt: 'prompt engineering best practices guide', mentions: 523, change: 8, source: 'AI Academy' },
];

const recentAlerts = [
  { id: 1, type: 'warning', message: 'AI mention velocity dropped 12% in last 24h', time: '2 hours ago', icon: AlertTriangle },
  { id: 2, type: 'info', message: 'ChatGPT integration queries up 23% today', time: '4 hours ago', icon: TrendingUp },
  { id: 3, type: 'success', message: 'AI visibility score reached 92% - new record!', time: '6 hours ago', icon: CheckCircle },
  { id: 4, type: 'info', message: 'Claude mentions increased 15% this week', time: '8 hours ago', icon: TrendingUp },
  { id: 5, type: 'warning', message: 'Perplexity search volume down 8%', time: '12 hours ago', icon: AlertTriangle },
];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="AI Visibility Score" value="92%" change={18} changeType="increase" icon={<Eye className="w-8 h-8" />} color="blue" />
        <KPICard title="LLM Mentions (7d)" value="4,789" change={23} changeType="increase" icon={<MessageSquare className="w-8 h-8" />} color="green" />
        <KPICard title="Share of Voice" value="67.3%" change={8} changeType="increase" icon={<Target className="w-8 h-8" />} color="yellow" />
        <KPICard title="Traffic Impact" value="+34%" change={12} changeType="increase" icon={<Zap className="w-8 h-8" />} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Visibility Over Time</h3>
              <p className="text-sm text-gray-600">Track your AI brand mentions across LLM platforms</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">7D</button>
              <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-full">30D</button>
              <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-full">90D</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={visibilityData}>
              <defs>
                <linearGradient id="colorVisibility" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(v) => new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="visibility" stroke="#3B82F6" fillOpacity={1} fill="url(#colorVisibility)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">LLM Platform Distribution</h3>
            <p className="text-sm text-gray-600">AI platform mention breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={engineData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {engineData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} formatter={(value: any) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {engineData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top AI-Related Queries</h3>
              <p className="text-sm text-gray-600">Most searched AI topics this week</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {topPrompts.map((prompt, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{prompt.prompt}</p>
                  <p className="text-xs text-gray-600 mt-1">{prompt.source}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{prompt.mentions}</p>
                  <p className={`text-xs ${prompt.change > 0 ? 'text-green-600' : 'text-red-600'}`}>{prompt.change > 0 ? '+' : ''}{prompt.change}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Monitoring Alerts</h3>
              <p className="text-sm text-gray-600">Real-time AI visibility notifications</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert) => {
              const IconComponent = alert.icon;
              return (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : alert.type === 'info' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
