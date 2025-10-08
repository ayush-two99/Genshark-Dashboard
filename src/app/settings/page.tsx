'use client';

import React, { useState } from 'react';
import { Save, Copy, Trash2, Plus, Eye, EyeOff, Key, Bell, User, CreditCard } from 'lucide-react';

type ApiKey = { id: string; name: string; key: string; lastUsed: string; masked: boolean };

const mockApiKeys: ApiKey[] = [
  { id: 'k1', name: 'Production API', key: 'sk-...abc123', lastUsed: '2024-01-15', masked: true },
  { id: 'k2', name: 'Development API', key: 'sk-...def456', lastUsed: '2024-01-10', masked: true },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'api' | 'billing'>('profile');
  const [profile, setProfile] = useState({ name: 'Ava Stone', email: 'ava@example.com', company: 'GENSHARK-AI' });
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    weeklyReports: true,
    experimentNotifications: false,
    darkMode: false,
  });
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);

  const toggleKeyMask = (id: string) => setApiKeys(prev => prev.map(k => k.id === id ? { ...k, masked: !k.masked } : k));
  const deleteKey = (id: string) => setApiKeys(prev => prev.filter(k => k.id !== id));
  const copyKey = (key: string) => navigator.clipboard.writeText(key);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Bell },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ] as const;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account, preferences, and integrations</p>
      </div>

      {/* Tab navigation */}
      <div className="bg-white rounded-lg border border-gray-200 p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Preferences tab */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive email notifications for important events' },
              { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Get weekly performance summaries' },
              { key: 'experimentNotifications', label: 'Experiment Updates', desc: 'Notifications when experiments complete' },
              { key: 'darkMode', label: 'Dark Mode', desc: 'Use dark theme interface' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences[item.key as keyof typeof preferences]}
                    onChange={(e) => setPreferences(prev => ({ ...prev, [item.key]: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Keys tab */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
            <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Generate New Key
            </button>
          </div>
          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{key.name}</div>
                  <div className="text-sm text-gray-600">Last used: {key.lastUsed}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                    {key.masked ? key.key : 'sk-live-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz'}
                  </code>
                  <button onClick={() => toggleKeyMask(key.id)} className="p-1 text-gray-600 hover:text-gray-900">
                    {key.masked ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => copyKey(key.key)} className="p-1 text-gray-600 hover:text-gray-900">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteKey(key.id)} className="p-1 text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Billing tab */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Current Plan</h4>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Pro Plan</span>
                  <span className="text-sm text-gray-600">$99/month</span>
                </div>
                <div className="text-sm text-gray-600">10 team members • Unlimited projects • Priority support</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-900">Visa ending in 4242</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Update</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 mr-3">
              Download Invoice
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Cancel Subscription
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


