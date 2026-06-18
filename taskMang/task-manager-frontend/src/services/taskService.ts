import api from './api';
import type { Task } from '../types';

export const taskService = {
  getAllTasks: () => api.get<Task[]>('/tasks').then(res => res.data),
  getTaskById: (id: number) => api.get<Task>(`/tasks/${id}`).then(res => res.data),
  createTask: (task: Partial<Task>) => api.post<Task>('/tasks', task).then(res => res.data),
  updateTask: (id: number, task: Partial<Task>) => api.put<Task>(`/tasks/${id}`, task).then(res => res.data),
  deleteTask: (id: number) => api.delete<void>(`/tasks/${id}`).then(res => res.data),
};
