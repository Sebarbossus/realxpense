import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadForm } from '../components/ReceiptUploader/UploadForm';
import { ReceiptForm } from '../components/ReceiptUploader/ReceiptForm';
import { OcrResult, ExpenseFormData } from '../types';
import { useExpenseStore } from '../store/expenseStore';
import { Card } from '../components/UI/Card';

export function UploadPage() {
  const navigate = useNavigate();
  const { addExpense } = useExpenseStore();
  
  const [step, setStep] = useState<'upload' | 'review'>('upload');
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  
  const handleUploadComplete = (result: OcrResult) => {
    setOcrResult(result);
    setStep('review');
  };
  
  const handleFormSubmit = (data: ExpenseFormData) => {
    const newExpense = addExpense(data);
    // Navigate to the newly created expense detail page
    navigate(`/expenses/${newExpense.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Expense</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Upload a receipt to automatically extract expense data
          </p>
        </div>
        
        {step === 'upload' ? (
          <Card>
            <Card.Header>
              <Card.Title>Upload Receipt</Card.Title>
            </Card.Header>
            <Card.Content>
              <UploadForm onUploadComplete={handleUploadComplete} />
            </Card.Content>
          </Card>
        ) : (
          ocrResult && <ReceiptForm initialData={ocrResult} onSubmit={handleFormSubmit} />
        )}
      </div>
    </div>
  );
}