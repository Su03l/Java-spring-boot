import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import TaskDetailsPage from './pages/TaskDetails/TaskDetailsPage';
import TaskFormPage from './pages/TaskForm/TaskFormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Shell with Sidebar Navigation */}
        <Route path="/" element={<MainLayout />}>
          {/* Root Redirect to Dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard route */}
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* Task Details route */}
          <Route path="tasks/:id" element={<TaskDetailsPage />} />
          
          {/* Create Task Form */}
          <Route path="tasks/new" element={<TaskFormPage />} />
          
          {/* Edit Task Form */}
          <Route path="tasks/:id/edit" element={<TaskFormPage />} />
          
          {/* Settings Placeholder */}
          <Route path="settings" element={
            <div className="text-center py-20 space-y-4 animate-slide-up">
              <h2 className="text-2xl font-extrabold tracking-wide text-black dark:text-white">إعدادات النظام</h2>
              <p className="text-black/50 dark:text-white/50 text-sm max-w-sm mx-auto">
                سيتم تهيئة ملف التعريف وتعديل روابط الباك إند وخيارات العميل هنا قريباً.
              </p>
            </div>
          } />
          
          {/* 404 Route Fallback */}
          <Route path="*" element={
            <div className="text-center py-20 space-y-6 animate-slide-up">
              <h2 className="text-3xl font-extrabold tracking-wide text-red-400">404: الصفحة غير موجودة</h2>
              <p className="text-black/50 dark:text-white/50 text-sm max-w-sm mx-auto">
                العنوان أو المسار الذي أدخلته غير صحيح أو تم نقله في خادم النظام.
              </p>
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="rounded-md bg-electric-cyan/10 border border-electric-cyan/30 px-6 py-2.5 text-sm font-semibold text-electric-cyan hover:bg-electric-cyan/20 transition-all hover:shadow-cyan-glow-sm"
              >
                العودة إلى لوحة التحكم
              </button>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
