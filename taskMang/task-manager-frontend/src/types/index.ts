export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
  startDate?: string; // LocalDate (format: YYYY-MM-DD)
  dueDate?: string;   // LocalDate (format: YYYY-MM-DD)
  time?: string;      // LocalTime (format: HH:mm or HH:mm:ss)
}

export interface ApiErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}
