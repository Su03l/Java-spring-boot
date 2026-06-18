import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Calendar, Clock, AlertCircle, Trash2 } from 'lucide-react';
import { taskService } from '../../services/taskService';
import type { Task } from '../../types';

export default function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskId = Number(id);

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(taskId)) {
      setError('معرف المهمة غير صالح.');
      setLoading(false);
      return;
    }

    taskService.getTaskById(taskId)
      .then((data) => {
        setTask(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to load task:', err);
        setError('تعذر تحميل تفاصيل المهمة المطلوبة من الخادم.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [taskId]);

  const handleDelete = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذه المهمة نهائياً؟')) {
      taskService.deleteTask(taskId)
        .then(() => {
          navigate('/dashboard');
        })
        .catch((err) => {
          console.error('Failed to delete task:', err);
          alert('تعذر حذف المهمة من الخادم.');
        });
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'TODO': return 'قيد الانتظار';
      case 'IN_PROGRESS': return 'قيد التنفيذ';
      case 'REVIEW': return 'قيد المراجعة';
      case 'DONE': return 'مكتمل';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric-cyan border-t-transparent shadow-cyan-glow"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4 text-red-400">
        <AlertCircle className="h-12 w-12 mx-auto" />
        <h2 className="text-xl font-bold">{error || 'لم يتم العثور على المهمة.'}</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-5 py-2 text-sm text-black dark:text-white hover:text-electric-cyan hover:border-electric-cyan transition-all"
        >
          العودة للوحة التحكم
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-slide-up text-black dark:text-white">
      {/* Navigation and Actions Row */}
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          العودة إلى لوحة التحكم
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/tasks/${task.id}/edit`)}
            className="inline-flex items-center gap-2 rounded-md border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 px-4.5 py-1.5 text-sm font-semibold text-black dark:text-white hover:border-electric-cyan hover:text-electric-cyan hover:shadow-cyan-glow-sm transition-all"
          >
            <Edit className="h-4 w-4" />
            تعديل المهمة
          </button>
          
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-md border border-red-500/25 bg-red-950/10 px-4.5 py-1.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300 transition-all"
          >
            <Trash2 className="h-4 w-4" />
            حذف المهمة
          </button>
        </div>
      </div>

      {/* Task Details Sheet */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Title, Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white m-0 leading-tight">
              {task.title}
            </h1>
            <div className="text-sm leading-relaxed text-black/80 dark:text-white/80 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-5">
              {task.description || 'لا يوجد وصف متاح لهذه المهمة.'}
            </div>
          </div>
        </div>

        {/* Right Column: Status info, Dates */}
        <div className="space-y-6">
          <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-5 space-y-5">
            <h3 className="text-sm font-bold text-black dark:text-white border-b border-black/10 dark:border-white/10 pb-2.5">
              خصائص المهمة
            </h3>

            {/* Status Info */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-black/60 dark:text-white/60">الحالة:</span>
              <span className="rounded bg-electric-cyan/5 border border-electric-cyan/20 px-2.5 py-0.5 text-xs font-semibold text-electric-cyan text-glow-cyan">
                {getStatusText(task.status)}
              </span>
            </div>

            {/* Start Date */}
            {task.startDate && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-black/60 dark:text-white/60">تاريخ البدء:</span>
                <span className="flex items-center gap-1.5 text-black dark:text-white">
                  <Calendar className="h-4 w-4 text-electric-cyan" />
                  {task.startDate}
                </span>
              </div>
            )}

            {/* Due Date */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-black/60 dark:text-white/60">تاريخ الاستحقاق:</span>
              <span className="flex items-center gap-1.5 text-black dark:text-white">
                <Calendar className="h-4 w-4 text-electric-cyan" />
                {task.dueDate || 'غير محدد'}
              </span>
            </div>

            {/* Time Details */}
            {task.time && (
              <div className="flex items-center justify-between text-sm border-t border-black/10 dark:border-white/10 pt-3">
                <span className="text-black/60 dark:text-white/60">وقت الاستحقاق:</span>
                <span className="flex items-center gap-1.5 text-black dark:text-white">
                  <Clock className="h-4 w-4 text-electric-cyan" />
                  {task.time.substring(0, 5)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
