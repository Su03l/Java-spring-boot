//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
void main() {

//    the type in java
    int age = 23;

    double price = 10.75;

    boolean isActive = true;

    String name = "suliman";

    System.out.println("My name is : " + name + "\nand my age is : " + age + "\nand my account is : " + isActive);

    System.out.println("===================");

    // the if statement

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

    // the while loop
    int counter = 0;
    while (counter < 3) {
        System.out.println("While loop: " + counter);
        counter++;
    }

    System.out.println("===================");

    // the function
    int result = sum(10, 10);
    System.out.println("The result is : " + result);

    System.out.println("===================");


    // the task 1
    // about check if the number odd or even
    int number = 7;
    if (number % 2 == 0) {
        System.out.println("The number is even");
    } else if (number % 2 != 0) {
        System.out.println("The number is odd");
    }
    System.out.println("===================");

    //task 2
    int result2 = checkDev(5);
    if (result2 == 1) {
        System.out.println("The number is divisible by 2");
    } else if (result2 == 0) {
        System.out.println("The number is not divisible by 2");
    }

}

public static int sum(int num1, int num2) {
    return num1 + num2;
}

public static int checkDev(int num) {
    if (num / 2 == 0) {
        return 1;
    } else {
        return 0;
    }
}
