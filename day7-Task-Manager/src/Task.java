
public class Task {
    private int id;
    private String title;
    private boolean isCompleted;

    // Constructor
    public Task(int id, String title) {
        this.id = id;
        this.title = title;
        this.isCompleted = false;
    }

    // Getters and Setters for ID
    public int getId() {
        return id;
    }

    // Setters for ID
    public void setId(int id) {
        this.id = id;
    }

    // Getters and Setters for Title
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public void printTask() {
        System.out.println("[" + (isCompleted ? "X" : " ") + "] Task " + id + ": " + title);
    }
}
