package com.example.springbootfirst;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class StaffController {

    private final List<Staff> allStaff = new ArrayList<>();

    @GetMapping("/")
    public String showAddNewStaffForm(Model model) {
        model.addAttribute("addNewStaff", new Staff());
        return "addNewStaff";
    }

    @PostMapping("/dataSumbitForm")
    public String addStaff(Staff staff) {
        allStaff.add(staff);
        return "redirect:/getAllStaff";
    }

    @GetMapping("/getAllStaff")
    public String listStaff(Model model) {
        model.addAttribute("allStaff", allStaff);
        return "getAllStaff";
    }
}
