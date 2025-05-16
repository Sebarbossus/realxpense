import React from 'react';
import { Card } from '../UI/Card';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon, change, className }: StatsCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-semibold mt-1 text-gray-900 dark:text-gray-100">{value}</h3>
          </div>
          
          <div className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center',
            'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
          )}>
            {icon}
          </div>
        </div>
        
        {change && (
          <div className="mt-3">
            <span className={cn(
              'inline-flex items-center text-sm font-medium',
              change.isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            )}>
              <svg 
                className={cn(
                  'w-4 h-4 mr-1',
                  change.isPositive ? 'transform rotate-180' : ''
                )}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {Math.abs(change.value)}% from last period
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}