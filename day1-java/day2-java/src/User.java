// task 3
// the task for get and set user info and print
public class User {
    private int id;
    private String name;
    private String email;

    // the constructor
    public User (int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // the getter for id user
    public int getId() {
        return id;
    }

    // the setter for user id
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void printUserDetails() {
        System.out.println("ID: " + id + "| Name: " + name + "| Email: " + email);
    }
}
