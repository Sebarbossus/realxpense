export interface Expense {
  id: string;
  name: string;
  price: number;
  checkInDate?: string;
  checkOutDate?: string;
  bookingDate: string;
  category: ExpenseCategory;
  receiptUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ExpenseCategory = 
  | 'hotel'
  | 'flight'
  | 'transportation'
  | 'food'
  | 'entertainment'
  | 'other';

export interface ExpenseFormData {
  name: string;
  price: number;
  checkInDate?: string;
  checkOutDate?: string;
  bookingDate: string;
  category: ExpenseCategory;
  notes?: string;
}

export type OcrResult = Omit<ExpenseFormData, 'category'>;

export interface UploadState {
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  file: File | null;
  progress: number;
  error: string | null;
  result: OcrResult | null;
}