import React from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { FileDown, Filter } from 'lucide-react';

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Generate and download expense reports
          </p>
        </div>
        
        <Button leftIcon={<FileDown size={16} />}>
          Export Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Monthly Summary</Card.Title>
          </Card.Header>
          <Card.Content className="h-80 flex items-center justify-center text-center">
            <div>
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4">
                <Filter size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No filters selected</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Select a date range to generate a monthly report
              </p>
              <Button variant="outline" size="sm">
                Select Date Range
              </Button>
            </div>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Category Breakdown</Card.Title>
          </Card.Header>
          <Card.Content className="h-80 flex items-center justify-center text-center">
            <div>
              <div className="w-16 h-16 mx-auto rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-teal-600 dark:text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No data to display</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Add more expenses to see category breakdowns
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>
      
      <Card>
        <Card.Header>
          <Card.Title>Recent Reports</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't generated any reports yet
            </p>
            <Button variant="outline" size="sm" leftIcon={<FileDown size={16} />}>
              Generate Your First Report
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}