import React, { useState } from 'react';
import { Expense, ExpenseCategory } from '../../types';
import { ExpenseCard } from './ExpenseCard';
import { Search, Filter } from 'lucide-react';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'flight', label: 'Flight' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'food', label: 'Food' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500 dark:text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full md:w-48">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-500 dark:text-gray-400" />
            </div>
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={(value) => setCategoryFilter(value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
      
      {filteredExpenses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No expenses found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredExpenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </div>
      )}
    </div>
  );
}