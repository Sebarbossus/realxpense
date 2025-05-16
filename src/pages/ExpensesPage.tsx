import React from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { ExpenseList } from '../components/Expenses/ExpenseList';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { Plus, FileDown } from 'lucide-react';

export function ExpensesPage() {
  const { expenses } = useExpenseStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Expenses</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage and track all your travel expenses
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            leftIcon={<FileDown size={16} />}
          >
            Export
          </Button>
          <Link to="/upload">
            <Button leftIcon={<Plus size={16} />}>
              Add Expense
            </Button>
          </Link>
        </div>
      </div>
      
      <ExpenseList expenses={expenses} />
    </div>
  );
}