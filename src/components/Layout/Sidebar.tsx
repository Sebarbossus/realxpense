import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ReceiptText, 
  Upload, 
  BarChart, 
  Settings,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      href: '/',
    },
    {
      name: 'Expenses',
      icon: <ReceiptText size={20} />,
      href: '/expenses',
    },
    {
      name: 'Upload',
      icon: <Upload size={20} />,
      href: '/upload',
    },
    {
      name: 'Reports',
      icon: <BarChart size={20} />,
      href: '/reports',
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      href: '/settings',
    },
  ];

  const isActive = (path: string): boolean => {
    return location.pathname === path || 
          (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform md:translate-x-0 pt-16",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="md:hidden absolute right-4 top-4">
          <button
            onClick={closeSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => closeSidebar()}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-800 dark:text-blue-200">
                <span className="text-sm font-medium">PRO</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Upgrade to Pro</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">Get advanced features</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}