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

// Mock data for charts
const visibilityData = [
  { date: '2024-01-01', visibility: 65, mentions: 120, traffic: 2500 },
  { date: '2024-01-02', visibility: 68, mentions: 135, traffic: 2800 },
  { date: '2024-01-03', visibility: 72, mentions: 142, traffic: 3100 },
  { date: '2024-01-04', visibility: 75, mentions: 158, traffic: 3400 },
  { date: '2024-01-05', visibility: 78, mentions: 165, traffic: 3600 },
  { date: '2024-01-06', visibility: 82, mentions: 180, traffic: 3900 },
  { date: '2024-01-07', visibility: 85, mentions: 195, traffic: 4200 },
];

const engineData = [
  { name: 'ChatGPT', value: 35, color: '#10B981' },
  { name: 'Claude', value: 25, color: '#3B82F6' },
  { name: 'Perplexity', value: 20, color: '#8B5CF6' },
  { name: 'Bard', value: 15, color: '#F59E0B' },
  { name: 'Others', value: 5, color: '#6B7280' },
];

const topPrompts = [
  { prompt: 'best wireless headphones 2025', mentions: 45, change: 12, source: 'TechReviewer' },
  { prompt: 'budget earbuds for running', mentions: 38, change: -3, source: 'RunnerBlog' },
  { prompt: 'noise cancelling headphones review', mentions: 32, change: 8, source: 'AudioExpert' },
  { prompt: 'wireless audio quality comparison', mentions: 28, change: -2, source: 'SoundCheck' },
  { prompt: 'gaming headset recommendations', mentions: 25, change: 15, source: 'GameTech' },
];

const recentAlerts = [
  { 
    id: 1, 
    type: 'warning', 
    message: 'Mentions dropped below 50 in the last 7 days', 
    time: '2 hours ago',
    icon: AlertTriangle
  },
  { 
    id: 2, 
    type: 'info', 
    message: 'Visibility score increased by 15% today', 
    time: '4 hours ago',
    icon: TrendingUp
  },
  { 
    id: 3, 
    type: 'success', 
    message: 'Share of voice exceeded 60% target', 
    time: '6 hours ago',
    icon: CheckCircle
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
          <p className="text-gray-600 mt-1">Monitor your AI visibility metrics and performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Settings
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Visibility Score"
          value="85%"
          change={12}
          changeType="increase"
          icon={<Eye className="w-8 h-8" />}
          color="blue"
        />
        <KPICard
          title="AI Mentions (7d)"
          value="1,247"
          change={8}
          changeType="increase"
          icon={<MessageSquare className="w-8 h-8" />}
          color="green"
        />
        <KPICard
          title="Share of Voice"
          value="42.3%"
          change={-2}
          changeType="decrease"
          icon={<Target className="w-8 h-8" />}
          color="yellow"
        />
        <KPICard
          title="Traffic Impact"
          value="+28%"
          change={15}
          changeType="increase"
          icon={<Zap className="w-8 h-8" />}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visibility Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Visibility Over Time</h3>
              <p className="text-sm text-gray-600">Track your brand mentions across AI platforms</p>
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
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              />
              <Area 
                type="monotone" 
                dataKey="visibility" 
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorVisibility)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Engine Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Engine Breakdown</h3>
            <p className="text-sm text-gray-600">AI platform distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={engineData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {engineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: any) => [`${value}%`, 'Share']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {engineData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Prompts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Prompts</h3>
              <p className="text-sm text-gray-600">Most mentioned prompts this week</p>
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
                  <p className={`text-xs ${prompt.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {prompt.change > 0 ? '+' : ''}{prompt.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
              <p className="text-sm text-gray-600">System notifications and updates</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert) => {
              const IconComponent = alert.icon;
              return (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    alert.type === 'info' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
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


