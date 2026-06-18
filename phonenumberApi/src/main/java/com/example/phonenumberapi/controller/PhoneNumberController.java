package com.example.phonenumberapi.controller;

import com.example.phonenumberapi.model.PhoneNumber;
import com.example.phonenumberapi.service.PhoneNumberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/phone-numbers")
@RequiredArgsConstructor
public class PhoneNumberController {

    private final PhoneNumberService service;

    @GetMapping
    public ResponseEntity<List<PhoneNumber>> getAllPhoneNumbers() {
        return ResponseEntity.ok(service.getAllPhoneNumbers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhoneNumber> getPhoneNumberById(@PathVariable UUID id) {
        return service.getPhoneNumberById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/shortcut-name/{name}")
    public ResponseEntity<List<PhoneNumber>> getPhoneNumbersByShortcutName(@PathVariable String name) {
        return service.getPhoneNumbersByShortcutName(name)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PhoneNumber> savePhoneNumber(@RequestBody PhoneNumber phoneNumber) {
        return new ResponseEntity<>(service.savePhoneNumber(phoneNumber), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePhoneNumber(@PathVariable UUID id, @RequestBody PhoneNumber phoneNumberDetails) {
        service.updatePhoneNumber(id, phoneNumberDetails);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoneNumber(@PathVariable UUID id) {
        service.deletePhoneNumber(id);
        return ResponseEntity.noContent().build();
    }

}
