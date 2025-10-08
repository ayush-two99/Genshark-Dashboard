'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

export default function KPICard({ 
  title, 
  value, 
  change, 
  changeType = 'increase', 
  icon,
  color = 'blue' 
}: KPICardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600'
  };

  const changeColorClasses = {
    increase: 'text-green-600 bg-green-50',
    decrease: 'text-red-600 bg-red-50'
  };

  return (
    <div className={`rounded-xl border-2 ${colorClasses[color]} p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-75 mb-2">{title}</p>
          <p className="text-3xl font-bold mb-2">{value}</p>
          {change !== undefined && (
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeColorClasses[changeType]}`}>
              {changeType === 'increase' ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 opacity-60">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}


