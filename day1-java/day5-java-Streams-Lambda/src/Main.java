import java.util.List;

public class Main {
    public static void main(String[] args) {
        // the list of names
        List<String> names = List.of("Ali", "Sara", "Ahmed", "Fahad");

        // print the names
        System.out.println("Names starting with 'A':");

        // use stream to iterate over the list
        names.stream()
                .filter(name -> name.startsWith("A"))
                .forEach(name -> System.out.println(name));

        // print a separator
        System.out.println("============================");

        // Task 1
        // the list of courses to make it upperCase
        List<String> courses = List.of("Java", "Javascript", "React", "PHP", "Python");

        // use stream to iterate over the list
        courses.stream()
                .map(course -> course.toUpperCase())
                .forEach(course -> System.out.println(course));

        // print a separator
        System.out.println("============================");
        //Task 2
        // the list of ages
        List<Integer> ages = List.of(15, 22, 17, 30, 12, 25);

        // print the ages
        System.out.println("Ages 18 and over:");
        // use stream to iterate over the list
        ages.stream()
                .filter(age -> age >= 18)
                .forEach(age -> System.out.println(age));

        // print a separator
        System.out.println("============================");

        //Task 2
        // the list of tools
        List<String> tools = List.of("Laravel", "React", "Spring", "Java");

        tools.stream()
                .map(tool -> "The number of characters in " + tool + " is = " + tool.length())
                .forEach(text -> System.out.println(text));

        System.out.println("============================");
    }
}