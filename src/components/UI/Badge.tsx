import React from 'react';
import { cn } from '../../lib/utils';
import { ExpenseCategory } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | CategoryVariant;
  className?: string;
}

type CategoryVariant = ExpenseCategory;

export function Badge({ 
  children, 
  variant = 'default', 
  className 
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    hotel: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    flight: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    transportation: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    food: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant as keyof typeof variantClasses],
        className
      )}
    >
      {children}
    </span>
  );
}