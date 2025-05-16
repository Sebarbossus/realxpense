import React from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { ExpensesByCategory } from '../components/Dashboard/ExpensesByCategory';
import { ExpenseCard } from '../components/Expenses/ExpenseCard';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../lib/utils';
import { 
  Receipt, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react';

export function Dashboard() {
  const { expenses } = useExpenseStore();
  
  // Calculate total expenses
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.price, 0);
  
  // Get recent expenses
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Track and manage your travel expenses</p>
        </div>
        <Link to="/upload">
          <Button leftIcon={<Plus size={16} />}>Add Expense</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Expenses" 
          value={formatCurrency(totalAmount)}
          icon={<CreditCard size={24} />}
          change={{ value: 12, isPositive: false }}
        />
        <StatsCard 
          title="Total Receipts" 
          value={expenses.length}
          icon={<Receipt size={24} />}
          change={{ value: 8, isPositive: true }}
        />
        <StatsCard 
          title="This Month" 
          value={formatCurrency(245.80)}
          icon={<Calendar size={24} />}
          change={{ value: 23, isPositive: false }}
        />
        <StatsCard 
          title="Avg. Per Day" 
          value={formatCurrency(38.50)}
          icon={<TrendingUp size={24} />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ExpensesByCategory expenses={expenses} />
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <Card.Header className="flex items-center justify-between">
              <Card.Title>Recent Expenses</Card.Title>
              <Link 
                to="/expenses" 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium inline-flex items-center"
              >
                View all
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {recentExpenses.length > 0 ? (
                  recentExpenses.map((expense) => (
                    <ExpenseCard 
                      key={expense.id} 
                      expense={expense} 
                      className="border-0 shadow-none hover:bg-gray-50 dark:hover:bg-gray-800/50" 
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No expenses yet.</p>
                    <Link to="/upload" className="mt-2 inline-block">
                      <Button variant="outline" size="sm" leftIcon={<Plus size={16} />}>
                        Add your first expense
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}