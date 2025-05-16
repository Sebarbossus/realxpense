import React from 'react';
import { Card } from '../UI/Card';
import { Expense } from '../../types';
import { Hotel, Plane, Car, Coffee, Music, FileText } from 'lucide-react';

interface ExpensesByCategoryProps {
  expenses: Expense[];
}

export function ExpensesByCategory({ expenses }: ExpensesByCategoryProps) {
  // Helper function to parse price values that might use comma as decimal separator
  const parsePrice = (price: number | string): number => {
    if (typeof price === 'number') return price;
    return parseFloat(String(price).replace(',', '.')) || 0;
  };

  // Count expenses by category
  const categoryCounts = expenses.reduce((acc, expense) => {
    const { category } = expense;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate total amount by category with proper number parsing
  const categoryAmounts = expenses.reduce((acc, expense) => {
    const { category, price } = expense;
    acc[category] = (acc[category] || 0) + parsePrice(price);
    return acc;
  }, {} as Record<string, number>);
  
  // Format the data for display
  const categoryData = [
    {
      id: 'hotel',
      label: 'Hotel',
      count: categoryCounts.hotel || 0,
      amount: categoryAmounts.hotel || 0,
      icon: <Hotel size={20} />,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400',
    },
    {
      id: 'flight',
      label: 'Flight',
      count: categoryCounts.flight || 0,
      amount: categoryAmounts.flight || 0,
      icon: <Plane size={20} />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
    },
    {
      id: 'transportation',
      label: 'Transportation',
      count: categoryCounts.transportation || 0,
      amount: categoryAmounts.transportation || 0,
      icon: <Car size={20} />,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
    },
    {
      id: 'food',
      label: 'Food',
      count: categoryCounts.food || 0,
      amount: categoryAmounts.food || 0,
      icon: <Coffee size={20} />,
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400',
    },
    {
      id: 'entertainment',
      label: 'Entertainment',
      count: categoryCounts.entertainment || 0,
      amount: categoryAmounts.entertainment || 0,
      icon: <Music size={20} />,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
    },
    {
      id: 'other',
      label: 'Other',
      count: categoryCounts.other || 0,
      amount: categoryAmounts.other || 0,
      icon: <FileText size={20} />,
      color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    },
  ];
  
  // Sort by amount (highest first)
  categoryData.sort((a, b) => b.amount - a.amount);
  
  // Calculate total for percentages
  const totalAmount = Object.values(categoryAmounts).reduce((sum, amount) => sum + (amount || 0), 0);

  // Format currency using en-US locale to ensure proper decimal handling
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Expenses by Category</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {categoryData.map((category) => (
            <div key={category.id} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${category.color}`}>
                {category.icon}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{category.label}</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(category.amount)}
                  </p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-blue-600 dark:bg-blue-500"
                    style={{ width: `${totalAmount > 0 ? (category.amount / totalAmount) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {category.count} {category.count === 1 ? 'expense' : 'expenses'} ({totalAmount > 0 ? ((category.amount / totalAmount) * 100).toFixed(1) : '0.0'}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}