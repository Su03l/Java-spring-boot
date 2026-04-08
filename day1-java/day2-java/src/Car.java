// task 2
// this task for get Car info
public class Car {
    private String brand;
    private int year;

    // the constructor
    public Car(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    // the getter for get brand and year
    public String getBrand() {
        return brand;
    }

    public int getYear() {
        return year;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setYear(int year) {
        if(year > 1985) {
            this.year = year;
        } else {
            System.out.println("Error: Invalid year!");
        }
    }

    public void printCarDetails() {
        System.out.println("Brand: " + brand + "| Year: " + year);
    }

}
