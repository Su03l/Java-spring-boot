package com.example.springbootfirst.repository;

import com.example.springbootfirst.Staff;

import java.util.ArrayList;
import java.util.List;



public class StaffRepository {

    private List <Staff> AllStaff = new ArrayList<>();

    public Staff getStaffByIndex (int index) {
        return AllStaff .get(index);
    }

    public void addStaff (Staff staff) {
        AllStaff .add(staff);
    }

    public void updateStaff (Staff staff, int index) {
        AllStaff .set(index, staff);
    }

    public List<Staff> getAllStaff() {
        return AllStaff;
    }
}
