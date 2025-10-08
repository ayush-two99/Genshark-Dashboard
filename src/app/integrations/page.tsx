'use client';
import React from 'react';

export default function IntegrationsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Integrations</h1>
        <p className="text-sm text-gray-500">Connect GA4, GSC, Slack, and SSO</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {['GA4','GSC','Slack','SSO'].map((name) => (
          <div key={name} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="font-medium">{name}</div>
            <div className="mt-1 text-sm text-gray-500">Status: Disconnected</div>
            <button className="mt-3 rounded bg-indigo-600 px-3 py-1.5 text-white">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}




