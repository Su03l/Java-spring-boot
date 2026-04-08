//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
void main() {

//    the type
    int age = 23;

    double price = 10.75;

    boolean isActive = true;

    String name = "suliman";

    System.out.println("My name is : " + name + "\nand my age is : " + age + "\nand my account is : " + isActive);

    System.out.println("===================");

    // the if statement
    int score = 85;

    if (score >= 90) {
        System.out.println(" The degree : A");
    } else if (score >= 80) {
        System.out.println(" The degree : B");
    } else if (score >= 70) {
    System.out.println(" The degree : C");
    } else if (score >= 60) {
        System.out.println(" The degree : D");
    } else {
        System.out.println(" The degree : F");
    }

    System.out.println("===================");

    // the switch
    int day = 4;
    switch (day) {
        case 1:
            System.out.println("Monday");
            break;
        case 2:
            System.out.println("Tuesday");
            break;
        case 3:
            System.out.println("Wednesday");
            break;
        case 4:
            System.out.println("Thursday");
            break;
        case 5:
            System.out.println("Friday");
            break;
        case 6:
            System.out.println("Saturday");
            break;
        case 7:
            System.out.println("Sunday");
            break;
        default:
            System.out.println("Invalid day number");
    }

    System.out.println("===================");

    // the for loop
    for (int i = 0; i <= 10; i++) {
        System.out.println("The number is : " + i);
    }

    System.out.println("===================");

    int counter = 0;
    while (counter < 3) {
        System.out.println("While loop: " + counter);
        counter++;
    }


}
