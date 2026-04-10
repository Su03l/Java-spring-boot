
import java.util.ArrayList;
import java.util.List;

// TaskManager class
public class TaskManager {
    // start the list
    private List<Task> tasks = new ArrayList<>();

    // add the task
    public void addTask(Task task) {
        tasks.add(task);
    }

    // list the task
    public void listTasks() {
        tasks.forEach(Task::printTask);
    }

    public void markTaskAsDone(int id) {
        tasks.stream()
                .filter(task -> task.getId() == id)
                .findFirst()
                .orElseThrow(() -> new TaskNotFoundException("Task with ID " + id + " not found."))
                .setCompleted(true);
    }

    public void deleteTask(int id) {
        boolean removed = tasks.removeIf(task -> task.getId() == id);
        if (!removed) {
            throw new TaskNotFoundException("Task with ID " + id + " not found.");
        }
    }
}
