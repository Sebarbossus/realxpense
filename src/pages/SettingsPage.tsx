import React from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { useTheme } from '../context/ThemeContext';
import { Select } from '../components/UI/Select';
import { Check } from 'lucide-react';

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account and application preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Profile Information</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <Input
                label="First Name"
                defaultValue="John"
              />
              <Input
                label="Last Name"
                defaultValue="Doe"
              />
              <Input
                label="Email Address"
                type="email"
                defaultValue="john.doe@example.com"
                className="md:col-span-2"
              />
            </div>
          </Card.Content>
          <Card.Footer>
            <Button>Save Changes</Button>
          </Card.Footer>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Appearance</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </label>
                <div className="flex space-x-4">
                  <div
                    className={`
                      border rounded-md p-4 cursor-pointer transition
                      ${theme === 'light' 
                        ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }
                    `}
                    onClick={() => theme !== 'light' && toggleTheme()}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Light</span>
                      {theme === 'light' && (
                        <Check size={18} className="text-blue-500" />
                      )}
                    </div>
                    <div className="w-full h-10 bg-white border border-gray-200 rounded"></div>
                  </div>
                  
                  <div
                    className={`
                      border rounded-md p-4 cursor-pointer transition
                      ${theme === 'dark' 
                        ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }
                    `}
                    onClick={() => theme !== 'dark' && toggleTheme()}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Dark</span>
                      {theme === 'dark' && (
                        <Check size={18} className="text-blue-500" />
                      )}
                    </div>
                    <div className="w-full h-10 bg-gray-900 border border-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <Select
                  label="Date Format"
                  options={[
                    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                  ]}
                  defaultValue="MM/DD/YYYY"
                />
              </div>
              
              <div>
                <Select
                  label="Currency"
                  options={[
                    { value: 'USD', label: 'USD ($)' },
                    { value: 'EUR', label: 'EUR (€)' },
                    { value: 'GBP', label: 'GBP (£)' },
                    { value: 'JPY', label: 'JPY (¥)' },
                  ]}
                  defaultValue="USD"
                />
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <Button>Save Preferences</Button>
          </Card.Footer>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Notifications</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Email Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications about your expenses</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Weekly Reports</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly expense reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <Button>Save Notification Settings</Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}