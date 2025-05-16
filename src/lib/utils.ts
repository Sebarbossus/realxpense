import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Formats a date string into a more readable format
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Simulates OCR processing of an image/PDF
 * In a real app, this would be replaced with an actual OCR service
 */
export function simulateOcrProcessing(file: File): Promise<{
  name: string;
  price: number;
  checkInDate?: string;
  checkOutDate?: string;
  bookingDate: string;
}> {
  // This is a placeholder for OCR functionality
  // In a real app, you would integrate with a service like Google Cloud Vision,
  // AWS Textract, or a specialized OCR library
  
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Generate random data (in a real app, this would be extracted from the file)
      const hotelNames = [
        'Grand Hyatt Hotel',
        'Marriott Resort & Spa',
        'Hilton Garden Inn',
        'Four Seasons Resort',
        'Sheraton Hotel',
      ];
      
      const today = new Date();
      const bookingDate = new Date(today);
      bookingDate.setDate(today.getDate() - Math.floor(Math.random() * 30));
      
      const checkInDate = new Date(bookingDate);
      checkInDate.setDate(bookingDate.getDate() + Math.floor(Math.random() * 30) + 1);
      
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkInDate.getDate() + Math.floor(Math.random() * 7) + 1);
      
      const price = Math.floor(Math.random() * 300) + 100;
      
      resolve({
        name: hotelNames[Math.floor(Math.random() * hotelNames.length)],
        price,
        checkInDate: checkInDate.toISOString().split('T')[0],
        checkOutDate: checkOutDate.toISOString().split('T')[0],
        bookingDate: bookingDate.toISOString().split('T')[0],
      });
    }, 2000);
  });
}