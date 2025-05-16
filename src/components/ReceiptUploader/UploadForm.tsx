import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image, File as FileIcon } from 'lucide-react';
import { Button } from '../UI/Button';
import { cn } from '../../lib/utils';
import { simulateOcrProcessing } from '../../lib/utils';
import { UploadState } from '../../types';

interface UploadFormProps {
  onUploadComplete: (result: any) => void;
}

export function UploadForm({ onUploadComplete }: UploadFormProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
    file: null,
    progress: 0,
    error: null,
    result: null,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadState({
      status: 'uploading',
      file,
      progress: 0,
      error: null,
      result: null,
    });

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadState((prev) => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return { ...prev, status: 'processing', progress: 100 };
        }
        return { ...prev, progress: prev.progress + 10 };
      });
    }, 300);

    // Simulate OCR processing after upload completes
    setTimeout(() => {
      clearInterval(interval);
      setUploadState((prev) => ({ ...prev, status: 'processing', progress: 100 }));

      simulateOcrProcessing(file)
        .then((result) => {
          setUploadState((prev) => ({ ...prev, status: 'success', result }));
          onUploadComplete(result);
        })
        .catch((error) => {
          setUploadState((prev) => ({ 
            ...prev, 
            status: 'error', 
            error: 'Failed to process the receipt. Please try again.'
          }));
        });
    }, 3000);
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled: uploadState.status === 'uploading' || uploadState.status === 'processing',
  });

  const resetUpload = () => {
    setUploadState({
      status: 'idle',
      file: null,
      progress: 0,
      error: null,
      result: null,
    });
  };

  const getFileIcon = () => {
    const fileType = uploadState.file?.type || '';
    
    if (fileType.includes('image')) {
      return <Image size={24} className="text-blue-500" />;
    } else if (fileType.includes('pdf')) {
      return <FileText size={24} className="text-red-500" />;
    }
    
    return <FileIcon size={24} className="text-gray-500" />;
  };

  return (
    <div className="w-full">
      {uploadState.status === 'idle' || uploadState.status === 'error' ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive 
              ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30" 
              : "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600",
            uploadState.error ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950/30" : ""
          )}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Upload size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              {isDragActive ? 'Drop the file here' : 'Upload your receipt'}
            </h3>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Drag and drop your receipt here, or click to select a file
            </p>
            
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Supports JPG, PNG, and PDF files
            </p>
            
            {uploadState.error && (
              <div className="mt-4 text-sm text-red-600 dark:text-red-400">
                {uploadState.error}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getFileIcon()}
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {uploadState.file?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(uploadState.file?.size ? (uploadState.file.size / 1024).toFixed(1) : '0')} KB
                </p>
              </div>
            </div>
            
            {uploadState.status !== 'success' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetUpload}
                disabled={uploadState.status === 'processing'}
                aria-label="Cancel upload"
              >
                <X size={18} />
              </Button>
            )}
          </div>
          
          <div className="mb-2">
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-300",
                  uploadState.status === 'processing' 
                    ? "bg-yellow-500 dark:bg-yellow-600 animate-pulse" 
                    : uploadState.status === 'success'
                    ? "bg-green-500 dark:bg-green-600"
                    : "bg-blue-500 dark:bg-blue-600"
                )}
                style={{ width: `${uploadState.progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {uploadState.status === 'uploading' && 'Uploading...'}
              {uploadState.status === 'processing' && 'Processing receipt...'}
              {uploadState.status === 'success' && 'Processing complete!'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {uploadState.progress}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}