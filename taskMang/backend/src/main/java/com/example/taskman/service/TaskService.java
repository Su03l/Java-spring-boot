package com.example.taskman.service;

import com.example.taskman.model.Task;
import com.example.taskman.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    // show all Tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // create new task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // get Task by id
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    // تحديث مهمة موجودة
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("لم يتم العثور على المهمة بالرقم: " + id));

        // تحديث البيانات
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setStartDate(taskDetails.getStartDate());
        task.setDueDate(taskDetails.getDueDate());
        task.setTime(taskDetails.getTime());

        return taskRepository.save(task);
    }
    // delete Task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }


}
