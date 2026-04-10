
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

    // mark the task as done
    public void markTaskAsDone(int id) {
        // check if the task is found
        tasks.stream()
                .filter(task -> task.getId() == id)
                .findFirst()
                .orElseThrow(() -> new TaskNotFoundException("Task with ID " + id + " not found."))
                .setCompleted(true);
    }

    // delete the task
    public void deleteTask(int id) {
        boolean removed = tasks.removeIf(task -> task.getId() == id);
        // check if the task was removed
        if (!removed) {
            throw new TaskNotFoundException("Task with ID " + id + " not found.");
        }
    }
}
