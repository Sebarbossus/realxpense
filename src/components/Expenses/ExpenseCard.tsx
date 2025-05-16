import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, cn } from '../../lib/utils';
import { Expense } from '../../types';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { ArrowRight, Calendar, Plane, Car, Hotel, Coffee, Music, FileText } from 'lucide-react';

const CategoryIcons = {
  hotel: <Hotel size={16} />,
  flight: <Plane size={16} />,
  transportation: <Car size={16} />,
  food: <Coffee size={16} />,
  entertainment: <Music size={16} />,
  other: <FileText size={16} />,
};

interface ExpenseCardProps {
  expense: Expense;
  className?: string;
}

export function ExpenseCard({ expense, className }: ExpenseCardProps) {
  return (
    <Card 
      className={cn(
        "hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            {
              "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400": expense.category === 'hotel',
              "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400": expense.category === 'flight',
              "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400": expense.category === 'transportation',
              "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400": expense.category === 'food',
              "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400": expense.category === 'entertainment',
              "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400": expense.category === 'other',
            }
          )}>
            {CategoryIcons[expense.category]}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{expense.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Calendar size={14} className="mr-1" />
              {formatDate(expense.bookingDate)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(expense.price)}</p>
          <Badge variant={expense.category}>{expense.category}</Badge>
        </div>
      </div>
      
      {(expense.category === 'hotel' && expense.checkInDate && expense.checkOutDate) && (
        <div className="px-6 pb-4 pt-0">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <div className="flex-1">
              <p className="font-medium">Check-in</p>
              <p>{formatDate(expense.checkInDate)}</p>
            </div>
            <ArrowRight size={16} className="mx-2" />
            <div className="flex-1">
              <p className="font-medium">Check-out</p>
              <p>{formatDate(expense.checkOutDate)}</p>
            </div>
          </div>
        </div>
      )}
      
      <Card.Footer className="bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {expense.notes ? expense.notes : 'No notes added'}
        </span>
        <Link 
          to={`/expenses/${expense.id}`} 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
        >
          View details
        </Link>
      </Card.Footer>
    </Card>
  );
}