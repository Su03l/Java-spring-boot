package com.example.springbootfirst;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class StaffController {

    List <Staff> allStaff = Arrays.asList(
            new Staff("Suliman", "Software Developer", 7364),
            new Staff("Sarah", "Software Engineer", 857425),
            new Staff("ahmed", "IT Engineer", 85745)
    );
    @GetMapping("/staff")
    public String staffdetails(Model model) {

        model.addAttribute("allStaff", allStaff);
        return "staffdetails";
    }
    // Example in your Controller

}
