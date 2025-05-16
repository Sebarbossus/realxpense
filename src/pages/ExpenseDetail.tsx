import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useExpenseStore } from '../store/expenseStore';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { Input } from '../components/UI/Input';
import { formatCurrency, formatDate } from '../lib/utils';
import { 
  ArrowLeft, 
  Trash2, 
  Edit, 
  Calendar, 
  Receipt, 
  FileText,
  Plane,
  Car,
  Hotel,
  Coffee,
  Music,
} from 'lucide-react';

const CategoryIcons = {
  hotel: <Hotel size={20} />,
  flight: <Plane size={20} />,
  transportation: <Car size={20} />,
  food: <Coffee size={20} />,
  entertainment: <Music size={20} />,
  other: <FileText size={20} />,
};

export function ExpenseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { getExpense, updateExpense, deleteExpense } = useExpenseStore();
  const expense = getExpense(id || '');
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: expense?.name || '',
    notes: expense?.notes || '',
    price: expense?.price.toString() || '',
  });
  
  if (!expense) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-2">Expense not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The expense you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/expenses">
          <Button variant="outline" leftIcon={<ArrowLeft size={16} />}>
            Back to Expenses
          </Button>
        </Link>
      </div>
    );
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(expense.id);
      navigate('/expenses');
    }
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      updateExpense(expense.id, {
        name: formData.name,
        notes: formData.notes,
        price: parseFloat(formData.price),
      });
    }
    
    setIsEditing(!isEditing);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/expenses">
            <Button variant="ghost" size="sm" aria-label="Back to expenses">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Expense Details
          </h1>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={isEditing ? undefined : <Edit size={16} />}
            onClick={handleEditToggle}
          >
            {isEditing ? 'Save Changes' : 'Edit'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Trash2 size={16} />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <Card.Header className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${expense.category === 'hotel' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 
                   expense.category === 'flight' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' :
                   expense.category === 'transportation' ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' :
                   expense.category === 'food' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400' :
                   expense.category === 'entertainment' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400' :
                   'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {CategoryIcons[expense.category]}
                </div>
                {isEditing ? (
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="font-medium"
                  />
                ) : (
                  <div>
                    <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                      {expense.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(expense.bookingDate)}
                    </p>
                  </div>
                )}
              </div>
              <Badge variant={expense.category}>{expense.category}</Badge>
            </Card.Header>
            
            <Card.Content>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</p>
                    {isEditing ? (
                      <Input
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(expense.price)}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                    <div className="flex items-center space-x-2">
                      <Calendar size={18} className="text-gray-400" />
                      <p className="text-gray-900 dark:text-gray-100">{formatDate(expense.bookingDate)}</p>
                    </div>
                  </div>
                </div>
                
                {expense.category === 'hotel' && expense.checkInDate && expense.checkOutDate && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Stay Details</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Check-in</p>
                        <p className="text-gray-900 dark:text-gray-100">{formatDate(expense.checkInDate)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Check-out</p>
                        <p className="text-gray-900 dark:text-gray-100">{formatDate(expense.checkOutDate)}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Notes</p>
                  {isEditing ? (
                    <Input
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Add notes..."
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">
                      {expense.notes || 'No notes added'}
                    </p>
                  )}
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
        
        <div>
          <Card>
            <Card.Header>
              <Card.Title>Receipt</Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col items-center justify-center text-center p-8">
              {expense.receiptUrl ? (
                <img 
                  src={expense.receiptUrl} 
                  alt="Receipt" 
                  className="max-w-full h-auto rounded-md shadow-sm"
                />
              ) : (
                <div className="py-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <Receipt size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No receipt image available</p>
                  <Button variant="outline" size="sm">Upload Receipt</Button>
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}