'use client';

import React, { useState, useEffect } from 'react';
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
  { date: '2024-01-01', organic: 1200, direct: 800, referral: 400, social: 200 },
  { date: '2024-01-02', organic: 1350, direct: 850, referral: 450, social: 250 },
  { date: '2024-01-03', organic: 1500, direct: 900, referral: 500, social: 300 },
  { date: '2024-01-04', organic: 1650, direct: 950, referral: 550, social: 350 },
  { date: '2024-01-05', organic: 1800, direct: 1000, referral: 600, social: 400 },
  { date: '2024-01-06', organic: 1950, direct: 1050, referral: 650, social: 450 },
  { date: '2024-01-07', organic: 2100, direct: 1100, referral: 700, social: 500 },
];

const engagementData = [
  { metric: 'Page Views', value: 85, fullMark: 100 },
  { metric: 'Time on Site', value: 72, fullMark: 100 },
  { metric: 'Bounce Rate', value: 45, fullMark: 100 },
  { metric: 'Conversion', value: 68, fullMark: 100 },
  { metric: 'Social Shares', value: 78, fullMark: 100 },
  { metric: 'AI Mentions', value: 92, fullMark: 100 },
];

const llmSignalsData = [
  { name: 'ChatGPT', mentions: 45, traffic: 1200, engagement: 78 },
  { name: 'Claude', mentions: 32, traffic: 890, engagement: 82 },
  { name: 'Perplexity', mentions: 28, traffic: 750, engagement: 75 },
  { name: 'Bard', mentions: 22, traffic: 650, engagement: 70 },
  { name: 'Copilot', mentions: 18, traffic: 520, engagement: 68 },
];

const contentPerformanceData = [
  { title: 'Best Wireless Headphones 2025', views: 15420, mentions: 45, score: 92 },
  { title: 'Budget Earbuds for Running', views: 12350, mentions: 38, score: 87 },
  { title: 'Noise Cancelling Headphones Review', views: 9870, mentions: 32, score: 84 },
  { title: 'Gaming Headset Recommendations', views: 8760, mentions: 28, score: 79 },
  { title: 'Wireless Audio Quality Comparison', views: 7430, mentions: 25, score: 76 },
];

const competitorData = [
  { name: 'Your Brand', value: 42 },
  { name: 'Competitor A', value: 28 },
  { name: 'Competitor B', value: 18 },
  { name: 'Competitor C', value: 12 },
];

export default function InsightsPage() {
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
              <p className="text-sm text-gray-600">Total Traffic</p>
              <p className="text-2xl font-bold text-gray-900">24.5K</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% vs last period
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
              <p className="text-sm text-gray-600">AI Mentions</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% vs last period
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
              <p className="text-sm text-gray-600">Engagement Rate</p>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-xs text-red-600 flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                -2% vs last period
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
              <p className="text-sm text-gray-600">Share of Voice</p>
              <p className="text-2xl font-bold text-gray-900">42.3%</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5% vs last period
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


