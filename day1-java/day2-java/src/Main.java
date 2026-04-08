//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
void main() {

//    Car myCar = new Car("Toyota", 2020);
//
//    myCar.printCarDetails();
//
//    myCar.setYear(2024);
//
//    System.out.println("Update Year : " + myCar.getYear());
//
//    myCar.setYear(1963);

//    User userOne = new User(1, "Suliman", "suliman@gmail.com");
//
//    User userTwo = new User(2, "Ahmed", "Ahmed@gmail.com");
//
//    userOne.printUserDetails();
//    userTwo.printUserDetails();

    BankAccount account = new BankAccount("123456", 1000);

    System.out.println("Initial balance: " + account.getBalance());

    System.out.println("\nWithdrawing 500...");
    account.withdraw(500);
    System.out.println("Balance: " + account.getBalance());

    System.out.println("\nWithdrawing 2000...");
    account.withdraw(2000);
    System.out.println("Balance: " + account.getBalance());

    System.out.println("\nDepositing 300...");
    account.deposit(300);
    System.out.println("Balance: " + account.getBalance());

    System.out.println("\nWithdrawing 200...");
    account.withdraw(200);
    System.out.println("Balance: " + account.getBalance());

}
