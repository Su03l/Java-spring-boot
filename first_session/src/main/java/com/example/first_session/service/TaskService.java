package com.example.first_session.service;

import com.example.first_session.Model.Task;
import com.example.first_session.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    // Dependency Injection عبر الـ Constructor
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // القراءة (Read)
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // الإنشاء (Create)
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // update Task
    public Task findTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("لم يتم العثور على المهمة بالرقم: " + id));
    }

    // التعديل (Update)
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("لم يتم العثور على المهمة بالرقم: " + id));

        task.setTitle(taskDetails.getTitle());
        task.setCompleted(taskDetails.isCompleted());
        return taskRepository.save(task);
    }

    // الحذف (Delete)
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
