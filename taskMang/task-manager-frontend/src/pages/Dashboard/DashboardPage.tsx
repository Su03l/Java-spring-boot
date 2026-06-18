import { useState, useEffect } from 'react';
import { PlusCircle, Filter, CheckCircle2, Clock, ListTodo, AlertCircle, Calendar } from 'lucide-react';
import { taskService } from '../../services/taskService';
import type { Task } from '../../types';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  useEffect(() => {
    taskService.getAllTasks()
      .then((data) => {
        setTasks(data || []);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to load tasks:', err);
        setError('تعذر تحميل المهام من الخادم. يرجى التحقق من اتصال الباك إند.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTasks = filterStatus === 'ALL'
    ? tasks
    : tasks.filter(t => t.status === filterStatus);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'TODO': return 'قيد الانتظار';
      case 'IN_PROGRESS': return 'قيد التنفيذ';
      case 'REVIEW': return 'قيد المراجعة';
      case 'DONE': return 'مكتمل';
      default: return status;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'border-electric-cyan bg-electric-cyan/10 text-electric-cyan';
      case 'IN_PROGRESS':
        return 'border-electric-cyan text-electric-cyan';
      default:
        return 'border-black/20 dark:border-white/20 text-black/60 dark:text-white/60';
    }
  };

  // Dynamic calculations based on backend tasks
  const todoCount = tasks.filter(t => t.status === 'TODO').length;
  const inProgressCount = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const reviewCount = tasks.filter(t => t.status === 'REVIEW').length;
  const completedCount = tasks.filter(t => t.status === 'DONE').length;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Top Banner section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-black dark:text-white m-0">
            لوحة تحكم مساحة العمل
          </h1>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            إدارة ومراقبة سير عمل المشروع وجدولته الزمنية بكل سهولة.
          </p>
        </div>
        <button
          onClick={() => window.location.href = '/tasks/new'}
          className="inline-flex items-center gap-2 rounded-md bg-electric-cyan px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition-all shadow-cyan-glow"
        >
          <PlusCircle className="h-4 w-4" />
          إنشاء مهمة
        </button>
      </div>

      {/* KPI Stats widgets grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'بانتظار البدء', val: todoCount, icon: ListTodo, color: 'border-black/10 dark:border-white/10 text-black dark:text-white' },
          { label: 'قيد التنفيذ', val: inProgressCount, icon: Clock, color: 'text-electric-cyan border-electric-cyan/20 shadow-cyan-glow-sm bg-electric-cyan/5' },
          { label: 'قيد المراجعة', val: reviewCount, icon: AlertCircle, color: 'border-black/10 dark:border-white/10 text-black dark:text-white' },
          { label: 'المكتملة', val: completedCount, icon: CheckCircle2, color: 'border-black/10 dark:border-white/10 text-black dark:text-white' }
        ].map((stat, idx) => (
          <div key={idx} className={`flex items-center justify-between rounded-lg border bg-black/5 dark:bg-white/5 p-5 backdrop-blur-md transition-colors ${stat.color}`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">{stat.label}</p>
              <h3 className="mt-1 text-3xl font-extrabold tracking-tight">{stat.val}</h3>
            </div>
            <stat.icon className="h-8 w-8 opacity-80" />
          </div>
        ))}
      </div>

      {/* Filter and Content section */}
      <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-electric-cyan" />
            <h2 className="text-lg font-bold text-black dark:text-white m-0">قائمة المهام</h2>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'ALL', label: 'الكل' },
              { key: 'TODO', label: 'قيد الانتظار' },
              { key: 'IN_PROGRESS', label: 'قيد التنفيذ' },
              { key: 'REVIEW', label: 'قيد المراجعة' },
              { key: 'DONE', label: 'المكتملة' }
            ].map((status) => (
              <button
                key={status.key}
                onClick={() => setFilterStatus(status.key)}
                className={`rounded px-3 py-1 text-xs font-semibold transition-all duration-200 border ${
                  filterStatus === status.key
                    ? 'border-electric-cyan bg-electric-cyan/10 text-black dark:text-white'
                    : 'border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric-cyan border-t-transparent shadow-cyan-glow"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-3 text-red-400">
            <AlertCircle className="h-10 w-10" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-16 text-black/50 dark:text-white/50 border border-dashed border-black/10 dark:border-white/10 rounded-lg">
            <ListTodo className="h-12 w-12 mx-auto mb-3 opacity-30 text-black dark:text-white" />
            <p className="text-sm font-semibold">لا توجد مهام متطابقة مع التصفية الحالية.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => window.location.href = `/tasks/${task.id}`}
                className="group relative flex flex-col justify-between rounded-lg border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 p-5 hover:border-electric-cyan/40 dark:hover:border-electric-cyan/40 hover:shadow-cyan-glow-sm transition-all duration-300 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${getStatusBadgeColor(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                    <span className="text-[10px] text-black/40 dark:text-white/40">#{task.id}</span>
                  </div>

                  <h3 className="text-base font-bold text-black dark:text-white group-hover:text-electric-cyan transition-colors line-clamp-1">
                    {task.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-black/60 dark:text-white/60 line-clamp-2 leading-relaxed">
                    {task.description || 'لا يوجد وصف متاح.'}
                  </p>
                </div>

                <div className="mt-6 border-t border-black/10 dark:border-white/10 pt-3 space-y-1.5 text-xs text-black/50 dark:text-white/50">
                  {task.startDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-electric-cyan" />
                      <span className="font-semibold text-black/70 dark:text-white/70">البدء:</span>
                      <span>{task.startDate}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-electric-cyan" />
                      <span className="font-semibold text-black/70 dark:text-white/70">الاستحقاق:</span>
                      <span>{task.dueDate || 'غير محدد'}</span>
                    </div>
                    {task.time && (
                      <span className="text-glow-cyan text-electric-cyan font-bold">{task.time.substring(0, 5)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
