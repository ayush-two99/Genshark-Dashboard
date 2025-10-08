'use client';

import React, { useMemo, useState } from 'react';
import { Search, Shield, UserPlus, Pencil, Trash2, Check, X } from 'lucide-react';

type Role = 'viewer' | 'editor' | 'manager' | 'admin';
type User = { id: string; name: string; email: string; role: Role; status: 'active' | 'invited' | 'suspended' };

const mockUsers: User[] = [
  { id: 'u1', name: 'Ava Stone', email: 'ava@example.com', role: 'admin', status: 'active' },
  { id: 'u2', name: 'Noah Patel', email: 'noah@example.com', role: 'manager', status: 'active' },
  { id: 'u3', name: 'Mia Chen', email: 'mia@example.com', role: 'editor', status: 'invited' },
  { id: 'u4', name: 'Leo Garcia', email: 'leo@example.com', role: 'viewer', status: 'suspended' },
];

export default function AdminPage() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users
      .filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .filter(u => roleFilter === 'all' ? true : u.role === roleFilter);
  }, [users, query, roleFilter]);

  const changeRole = (id: string, role: Role) => setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
  const toggleSuspend = (id: string) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u));
  const removeUser = (id: string) => setUsers(prev => prev.filter(u => u.id !== id));

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Console</h1>
          <p className="text-gray-600 mt-1">Manage users, roles, and organization settings</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" /> Invite User
        </button>
      </div>

      {/* Org settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Organization</h3>
            <Shield className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-sm text-gray-600">GENSHARK-AI</div>
          <div className="text-xs text-gray-500">Plan: Pro • Seats: 10</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Security</h3>
          </div>
          <div className="text-sm text-gray-600">2FA: Enabled</div>
          <div className="text-xs text-gray-500">SSO (SAML): Available</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Billing</h3>
          </div>
          <div className="text-sm text-gray-600">Next invoice: Nov 1, 2025</div>
          <div className="text-xs text-gray-500">Payment method: Visa **** 4242</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All roles</option>
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{u.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value as Role)}
                      className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="editor">Editor</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      u.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      u.status === 'invited' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => toggleSuspend(u.id)} className={`px-2 py-1 text-xs rounded-md border ${u.status === 'suspended' ? 'border-emerald-300 text-emerald-700' : 'border-gray-300 text-gray-700'} hover:bg-gray-50`}>
                        {u.status === 'suspended' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />} {u.status === 'suspended' ? 'Activate' : 'Suspend'}
                      </button>
                      <button onClick={() => removeUser(u.id)} className="px-2 py-1 text-xs rounded-md border border-red-300 text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RBAC placeholder */}
      <div className="rounded-lg border border-dashed p-4 text-sm text-gray-600">
        This page should be protected by RBAC. Hook it up to your auth layer to restrict access to <span className="font-medium">admin</span> and <span className="font-medium">manager</span> roles.
      </div>
    </div>
  );
}


