import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // Task 1
        // the list for the names
        List<String> names = new ArrayList<>();

        // add 3 names to list
        names.add("sull");
        names.add("ali");
        names.add("ahmed");

        // use for loop for each name in list
        for (String name : names) {
            System.out.println("Name : " + name);
        }

        // the space
        System.out.println("==============================");

        // use map for user names
        Map<Integer, String> userMap = new HashMap<>();

        // add 3 names to map
        userMap.put(1, "sull");
        userMap.put(2, "ali");
        userMap.put(3, "ahmed");

        String myUser = userMap.get(1);
        System.out.println("User 1 is: " + myUser);

        for (Integer key : userMap.keySet()) {
            System.out.println("ID: " + key + " | Name: " + userMap.get(key));
        }

        System.out.println("==============================");

        //Task 1
        List<String> cart = new ArrayList<>();

        cart.add("Laptop ");
        cart.add("Mouse");
        cart.add("Keyboard");

        cart.remove("Mouse");

        for (String item : cart) {
            System.out.println("Item: " + item);
        }

        // Task 2
        Map<String, Integer> grades = new HashMap<>();

        grades.put("Ali", 90);
        grades.put("Sara", 95);
        grades.put("Ahmed", 85);

        Integer checkUser = grades.get("Sara");
        System.out.println("Sara's grade: " + checkUser);

        for (String key : grades.keySet()) {
            System.out.println("Name: " + key + " | Grade: " + grades.get(key));
        }
    }
}