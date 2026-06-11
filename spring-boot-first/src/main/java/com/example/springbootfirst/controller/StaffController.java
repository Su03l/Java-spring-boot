package com.example.springbootfirst.controller;

import com.example.springbootfirst.Staff;
import com.example.springbootfirst.repository.StaffRepository;
import jakarta.persistence.MapKeyEnumerated;
import org.apache.coyote.Constants;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.scanner.Constant;

import java.util.ArrayList;
import java.util.List;

@Controller
public class StaffController {

    StaffRepository staffRepository = new StaffRepository();

    @GetMapping("/")
    public String addNewStaff(Model model, @RequestParam(required = false) String id) {
        int index = getStaffIndex(id);

        model.addAttribute("newStaff", index == Constants.NO_MATCH
        ? new Staff() : staffRepository.getStaffByIndex(index));

        return "addNewStaff";
    }

    public int getStaffIndex (String id) {
        for (int i = 0; i < AllStaff.size(); i++) {
            if (AllStaff.get(i).getId().equals(id)) return i;
        }
        return Constants.NO_MATCH;
    }

    @PostMapping("/dataSumbitForm")
    public String dataSumbitForm(@Valid @ModelAttribute("newStaff") Staff staff, BindingResult result) {

        if(result.hasErrors()) {
            return "addNewStaff";
        }
        int index = getStaffIndex(staff.getId());
        if (index == Constants.NO_MATCH) {
            staffRepository.addStaff(staff);
        } else {
            staffRepository.updateStaff(staff, index);
        }
        return "redirect:/getAllStaff";
    }


}
