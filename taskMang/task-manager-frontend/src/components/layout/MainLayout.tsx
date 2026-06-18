import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans antialiased transition-colors duration-300 ease-in-out" dir="rtl">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Container Area - Right side spacing for RTL */}
      <div className="flex flex-col md:pr-64 min-h-screen">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Render child pages inside spacious content viewport */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto animate-fade-in">
          <Outlet />
        </main>
      </div>

      {/* Overlay to dismiss mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
    </div>
  );
}
