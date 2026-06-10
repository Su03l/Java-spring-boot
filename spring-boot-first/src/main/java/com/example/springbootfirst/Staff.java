package com.example.springbootfirst;

public class Staff {
    private String staffName;
    private String jobTitle;
    private double staffSalary;

    public Staff() {
    }

    public Staff(String staffName,
                 String jobTitle,
                 double staffSalary) {
        this.staffName = staffName;
        this.jobTitle = jobTitle;
        this.staffSalary = staffSalary;
    }

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public double getStaffSalary() {
        return staffSalary;
    }

    public void setStaffSalary(double staffSalary) {
        this.staffSalary = staffSalary;
    }

}