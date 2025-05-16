import React, { useState } from 'react';
import { ExpenseFormData, OcrResult, ExpenseCategory } from '../../types';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { Save, CheckCircle } from 'lucide-react';

interface ReceiptFormProps {
  initialData: OcrResult;
  onSubmit: (data: ExpenseFormData) => void;
}

export function ReceiptForm({ initialData, onSubmit }: ReceiptFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    ...initialData,
    category: 'hotel', // Default category based on the detected data
  });

  const categoryOptions = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'flight', label: 'Flight' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'food', label: 'Food' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value as ExpenseCategory }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title>Review Receipt Data</Card.Title>
          <div className="flex items-center text-green-600 dark:text-green-400">
            <CheckCircle size={18} className="mr-1" />
            <span className="text-sm font-medium">Processing Complete</span>
          </div>
        </div>
      </Card.Header>
      
      <Card.Content>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Input
              label="Vendor/Hotel Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter vendor name"
              required
            />
            
            <Input
              label="Amount"
              name="price"
              type="number"
              step="0.01"
              value={formData.price.toString()}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>
          
          <div>
            <Select
              label="Category"
              options={categoryOptions}
              value={formData.category}
              onChange={handleCategoryChange}
            />
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Input
              label="Booking Date"
              name="bookingDate"
              type="date"
              value={formData.bookingDate}
              onChange={handleChange}
              required
            />
            
            {formData.category === 'hotel' && (
              <>
                <Input
                  label="Check-in Date"
                  name="checkInDate"
                  type="date"
                  value={formData.checkInDate || ''}
                  onChange={handleChange}
                />
                
                <Input
                  label="Check-out Date"
                  name="checkOutDate"
                  type="date"
                  value={formData.checkOutDate || ''}
                  onChange={handleChange}
                />
              </>
            )}
          </div>
          
          <div>
            <Input
              label="Notes"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              placeholder="Add any additional notes..."
            />
          </div>
        </form>
      </Card.Content>
      
      <Card.Footer className="flex justify-end">
        <Button
          type="button"
          onClick={handleSubmit}
          leftIcon={<Save size={18} />}
        >
          Save Expense
        </Button>
      </Card.Footer>
    </Card>
  );
}