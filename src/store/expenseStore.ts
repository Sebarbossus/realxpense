import { create } from 'zustand';
import { Expense, ExpenseFormData } from '../types';
import { generateId } from '../lib/utils';

interface ExpenseState {
  expenses: Expense[];
  isLoading: boolean;
  addExpense: (data: ExpenseFormData) => void;
  updateExpense: (id: string, data: Partial<ExpenseFormData>) => void;
  deleteExpense: (id: string) => void;
  getExpense: (id: string) => Expense | undefined;
}

// In a real app, this would interact with a backend API or database
export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [
    {
      id: 'exp-1',
      name: 'Hilton Garden Inn',
      price: 259.99,
      checkInDate: '2023-05-15',
      checkOutDate: '2023-05-18',
      bookingDate: '2023-04-30',
      category: 'hotel',
      receiptUrl: 'https://example.com/receipt1.jpg',
      notes: 'Business trip to San Francisco',
      createdAt: '2023-04-30T10:15:00Z',
      updatedAt: '2023-04-30T10:15:00Z',
    },
    {
      id: 'exp-2',
      name: 'United Airlines',
      price: 475.50,
      bookingDate: '2023-04-28',
      category: 'flight',
      receiptUrl: 'https://example.com/receipt2.jpg',
      notes: 'Return flight SF to NYC',
      createdAt: '2023-04-28T14:30:00Z',
      updatedAt: '2023-04-28T14:30:00Z',
    },
    {
      id: 'exp-3',
      name: 'Uber',
      price: 42.75,
      bookingDate: '2023-05-16',
      category: 'transportation',
      receiptUrl: 'https://example.com/receipt3.jpg',
      createdAt: '2023-05-16T08:45:00Z',
      updatedAt: '2023-05-16T08:45:00Z',
    },
  ],
  isLoading: false,
  
  addExpense: (data) => {
    const newExpense: Expense = {
      id: generateId(),
      ...data,
      receiptUrl: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    set((state) => ({
      expenses: [...state.expenses, newExpense],
    }));
    
    return newExpense;
  },
  
  updateExpense: (id, data) => {
    set((state) => ({
      expenses: state.expenses.map((expense) => 
        expense.id === id 
          ? { 
              ...expense, 
              ...data, 
              updatedAt: new Date().toISOString() 
            } 
          : expense
      ),
    }));
  },
  
  deleteExpense: (id) => {
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    }));
  },
  
  getExpense: (id) => {
    return get().expenses.find((expense) => expense.id === id);
  },
}));