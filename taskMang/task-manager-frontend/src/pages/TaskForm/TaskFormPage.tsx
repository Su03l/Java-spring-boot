import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { taskService } from '../../services/taskService';
import type { Task, TaskStatus } from '../../types';

export default function TaskFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const taskId = Number(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('TODO');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [time, setTime] = useState('');

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      if (isNaN(taskId)) {
        setError('معرف المهمة غير صالح.');
        setLoading(false);
        return;
      }

      taskService.getTaskById(taskId)
        .then((taskData) => {
          setTitle(taskData.title || '');
          setDescription(taskData.description || '');
          setStatus(taskData.status || 'TODO');
          setStartDate(taskData.startDate || '');
          setDueDate(taskData.dueDate || '');
          // Safe handling of LocalTime if it comes as HH:mm:ss
          setTime(taskData.time ? taskData.time.substring(0, 5) : '');
          setError(null);
        })
        .catch((err) => {
          console.error('Failed to load task for edit:', err);
          setError('تعذر تحميل تفاصيل المهمة للتعديل.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [taskId, isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Formulate the exact payload of the Spring Boot model
    const payload: Partial<Task> = {
      title,
      description: description || undefined,
      status,
      startDate: startDate || undefined,
      dueDate: dueDate || undefined,
      time: time ? `${time}:00` : undefined, // format as HH:mm:ss for LocalTime
    };

    const apiCall = isEditMode
      ? taskService.updateTask(taskId, { ...payload, id: taskId })
      : taskService.createTask(payload);

    apiCall
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error('Failed to save task:', err);
        alert('حدث خطأ أثناء حفظ المهمة في الخادم.');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric-cyan border-t-transparent shadow-cyan-glow"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4 text-red-400">
        <AlertCircle className="h-12 w-12 mx-auto" />
        <h2 className="text-xl font-bold">{error}</h2>
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
    <div className="max-w-3xl mx-auto space-y-6 animate-slide-up text-black dark:text-white">
      {/* Top Breadcrumb Nav */}
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          العودة إلى لوحة التحكم
        </button>
        <h2 className="text-lg font-bold text-black dark:text-white m-0">
          {isEditMode ? 'تعديل تفاصيل المهمة' : 'بدء مهمة جديدة'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 space-y-6 backdrop-blur-md">
          {/* Title input */}
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-sm font-semibold text-black/80 dark:text-white/80">
              عنوان المهمة <span className="text-electric-cyan">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: إعداد حماية الخادم وتوثيق JWT"
              className="w-full rounded-md border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 px-3.5 py-2 text-sm text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 transition-all focus:border-electric-cyan focus:outline-none"
            />
          </div>

          {/* Description input */}
          <div className="space-y-1.5">
            <label htmlFor="description" className="text-sm font-semibold text-black/80 dark:text-white/80">
              الوصف
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب تفاصيل المهمة أو متطلبات العمل هنا..."
              className="w-full rounded-md border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 px-3.5 py-2 text-sm text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 transition-all focus:border-electric-cyan focus:outline-none"
            />
          </div>

          {/* Input Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Status Selector */}
            <div className="space-y-1.5">
              <label htmlFor="status" className="text-sm font-semibold text-black/80 dark:text-white/80">
                حالة سير العمل
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-black px-3 py-2 text-sm text-black dark:text-white focus:border-electric-cyan focus:outline-none"
              >
                <option value="TODO">قيد الانتظار</option>
                <option value="IN_PROGRESS">قيد التنفيذ</option>
                <option value="REVIEW">قيد المراجعة</option>
                <option value="DONE">مكتمل</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <label htmlFor="startDate" className="text-sm font-semibold text-black/80 dark:text-white/80">
                تاريخ البدء
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-black px-3 py-2 text-sm text-black dark:text-white focus:border-electric-cyan focus:outline-none"
              />
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label htmlFor="dueDate" className="text-sm font-semibold text-black/80 dark:text-white/80">
                تاريخ الاستحقاق
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-black px-3 py-2 text-sm text-black dark:text-white focus:border-electric-cyan focus:outline-none"
              />
            </div>

            {/* Time */}
            <div className="space-y-1.5">
              <label htmlFor="time" className="text-sm font-semibold text-black/80 dark:text-white/80">
                الوقت
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-black px-3 py-2 text-sm text-black dark:text-white focus:border-electric-cyan focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3.5">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="rounded-md border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm font-semibold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-md bg-electric-cyan px-5 py-2 text-sm font-semibold text-black hover:opacity-90 hover:shadow-cyan-glow transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'جاري الحفظ...' : isEditMode ? 'تحديث المهمة' : 'تسجيل المهمة'}
          </button>
        </div>
      </form>
    </div>
  );
}
