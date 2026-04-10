
public class Main {
    public static void main(String[] args) {
        //init the class to use it
        TaskManager taskManager = new TaskManager();

        // add 3 tasks
        taskManager.addTask(new Task(1, "Learn Java"));
        taskManager.addTask(new Task(2, "Practice with a project"));
        taskManager.addTask(new Task(3, "Prepare for Spring Boot"));

        // print the init
        System.out.println("Initial Tasks:");
        // print the tasks
        taskManager.listTasks();

        // print the updated tasks
        System.out.println("\nMarking task 2 as done and deleting task 1...");
        // mark task 2 as done
        taskManager.markTaskAsDone(2);
        // delete task 1
        taskManager.deleteTask(1);

        // print the updated tasks
        System.out.println("\nUpdated Tasks:");
        taskManager.listTasks();

        System.out.println("\nTrying to delete a non-existent task...");
        try {
            taskManager.deleteTask(99);
        } catch (TaskNotFoundException e) {
            System.out.println(e.getMessage());
        }
    }
}
