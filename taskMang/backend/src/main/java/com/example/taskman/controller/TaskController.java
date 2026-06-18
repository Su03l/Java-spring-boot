    package com.example.taskman.controller;

    import com.example.taskman.model.Task;
    import com.example.taskman.service.TaskService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @CrossOrigin
    @RestController
    @RequiredArgsConstructor
    @RequestMapping("/api/tasks")
    public class TaskController {

        private final TaskService taskService;

        @GetMapping
        public List<Task> getAllTasks() {
            return taskService.getAllTasks();
        }

        @PostMapping
        public Task createTask(@RequestBody Task task) {
            return taskService.createTask(task);
        }

        @GetMapping("/{id}")
        public Task getTaskById(@PathVariable Long id) {
            return taskService.getTaskById(id);
        }

        @PutMapping("/{id}")
        public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
            return taskService.updateTask(id, taskDetails);
        }

        @DeleteMapping("/{id}")
        public void deleteTask(@PathVariable Long id) {
            taskService.deleteTask(id);
        }
    }
