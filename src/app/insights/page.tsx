'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Filter,
  Download,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

// Mock data for different chart types
const trafficData = [
  { date: '2024-12-15', organic: 18420, direct: 12340, referral: 8560, social: 4230 },
  { date: '2024-12-16', organic: 20150, direct: 13450, referral: 9230, social: 4670 },
  { date: '2024-12-17', organic: 22340, direct: 14560, referral: 10120, social: 5120 },
  { date: '2024-12-18', organic: 24560, direct: 15670, referral: 11010, social: 5570 },
  { date: '2024-12-19', organic: 26780, direct: 16780, referral: 11900, social: 6020 },
  { date: '2024-12-20', organic: 28990, direct: 17890, referral: 12790, social: 6470 },
  { date: '2024-12-21', organic: 31200, direct: 19000, referral: 13680, social: 6920 },
];

const engagementData = [
  { metric: 'AI Query Success', value: 92, fullMark: 100 },
  { metric: 'Response Accuracy', value: 88, fullMark: 100 },
  { metric: 'User Satisfaction', value: 85, fullMark: 100 },
  { metric: 'Platform Adoption', value: 78, fullMark: 100 },
  { metric: 'Feature Usage', value: 82, fullMark: 100 },
  { metric: 'AI Integration', value: 95, fullMark: 100 },
];

const llmSignalsData = [
  { name: 'ChatGPT', mentions: 4789, traffic: 31200, engagement: 92 },
  { name: 'Claude', mentions: 3245, traffic: 20150, engagement: 88 },
  { name: 'Perplexity', mentions: 2156, traffic: 13450, engagement: 85 },
  { name: 'Gemini', mentions: 1876, traffic: 11230, engagement: 82 },
  { name: 'Copilot', mentions: 1234, traffic: 8560, engagement: 78 },
];

const contentPerformanceData = [
  { title: 'AI Prompt Engineering Best Practices', views: 31200, mentions: 1247, score: 95 },
  { title: 'ChatGPT vs Claude: Complete Comparison', views: 28990, mentions: 892, score: 92 },
  { title: 'Top AI Tools for Content Creation 2024', views: 26780, mentions: 756, score: 89 },
  { title: 'AI Productivity Tools for Developers', views: 24560, mentions: 634, score: 87 },
  { title: 'Machine Learning Model Optimization', views: 22340, mentions: 523, score: 85 },
];

const competitorData = [
  { name: 'Your AI Platform', value: 67 },
  { name: 'OpenAI', value: 23 },
  { name: 'Anthropic', value: 7 },
  { name: 'Google AI', value: 3 },
];

function InsightsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'traffic' | 'engagement' | 'signals'>('traffic');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Handle URL parameters for tab selection
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['traffic', 'engagement', 'signals'].includes(tab)) {
      setActiveTab(tab as 'traffic' | 'engagement' | 'signals');
    }
  }, [searchParams]);

  const tabs = [
    { id: 'traffic', label: 'Traffic', icon: BarChart3 },
    { id: 'engagement', label: 'Engagement', icon: Activity },
    { id: 'signals', label: 'LLM Signals', icon: PieChartIcon },
  ];

  const renderChart = () => {
    switch (activeTab) {
      case 'traffic':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
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
              />
              <Area type="monotone" dataKey="organic" stackId="1" stroke="#3B82F6" fill="url(#colorOrganic)" />
              <Area type="monotone" dataKey="direct" stackId="1" stroke="#10B981" fill="url(#colorDirect)" />
              <Area type="monotone" dataKey="referral" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="social" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'engagement':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={engagementData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fontSize: 10 }} />
              <Radar
                name="Engagement"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        );
      
      case 'signals':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={llmSignalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="mentions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="traffic" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Insights</h1>
          <p className="text-gray-600 mt-1">Analyze traffic, engagement, and LLM signals across your content</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {activeTab === 'traffic' && 'Traffic Sources Over Time'}
              {activeTab === 'engagement' && 'Engagement Metrics'}
              {activeTab === 'signals' && 'LLM Platform Performance'}
            </h3>
            <p className="text-sm text-gray-600">
              {activeTab === 'traffic' && 'Track organic, direct, referral, and social traffic'}
              {activeTab === 'engagement' && 'Monitor user engagement across key metrics'}
              {activeTab === 'signals' && 'Compare mentions and traffic across AI platforms'}
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        {renderChart()}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitor Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Competitor Share of Voice</h3>
              <p className="text-sm text-gray-600">Market position comparison</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={competitorData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: any) => [`${value}%`, 'Share of Voice']}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Content Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Content</h3>
              <p className="text-sm text-gray-600">Best performing articles this period</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {contentPerformanceData.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{content.title}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-600">{content.views.toLocaleString()} views</span>
                    <span className="text-xs text-gray-600">{content.mentions} mentions</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-900">{content.score}</span>
                    <div className="ml-2 w-12 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          content.score >= 90 ? 'bg-green-500' :
                          content.score >= 80 ? 'bg-blue-500' :
                          content.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${content.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total AI Traffic</p>
              <p className="text-2xl font-bold text-gray-900">312K</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +23% vs last period
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">LLM Mentions</p>
              <p className="text-2xl font-bold text-gray-900">4,789</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18% vs last period
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">AI Accuracy Rate</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5% vs last period
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">AI Market Share</p>
              <p className="text-2xl font-bold text-gray-900">67.3%</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% vs last period
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <PieChartIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <InsightsContent />
    </Suspense>
  );
}


