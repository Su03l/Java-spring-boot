// the task 1
// this task about bank account to test the deposit and withdraw
public class BankAccount {
    private String accountNumber;
    private double balance;

    // the constructor
    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // the getter for get account number
    public String getAccountNumber() {
        return accountNumber;
    }

    // the getter for get balance
    public double getBalance() {
        return balance;
    }

    // for deposit check
    public void deposit(double amount) {
        if(amount > 0) {
            balance += amount;
        } else {
            System.out.println("Error: Invalid amount!");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        } else if (amount > balance) {
            System.out.println("رصيد غير كافٍ");
        } else {
            System.out.println("Error: Invalid amount!");
        }
    }
}