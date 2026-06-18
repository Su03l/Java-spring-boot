package com.example.phonenumberapi.service;

import com.example.phonenumberapi.model.PhoneNumber;
import com.example.phonenumberapi.repository.PhoneNumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PhoneNumberService {

    @Autowired
    private PhoneNumberRepository repository;

    public List<PhoneNumber> getAllPhoneNumbers() {
        return repository.findAll();
    }

    public Optional<PhoneNumber> getPhoneNumberById(UUID id) {
        return repository.findById(id);
    }

    public Optional<List<PhoneNumber>> getPhoneNumbersByShortcutName(String shortcutName) {
        return repository.findByShortcutName(shortcutName);
    }

    private void validatePhoneNumber(String phoneNumber) {
        if (phoneNumber == null || !phoneNumber.matches("^05\\d{8}$")) {
            throw new IllegalArgumentException("Phone number must be 10 digits starting with '05'");
        }
    }

    public PhoneNumber savePhoneNumber(PhoneNumber phoneNumber) {
        validatePhoneNumber(phoneNumber.getPhoneNumber());
        return repository.save(phoneNumber);
    }

    public void updatePhoneNumber(UUID id, PhoneNumber phoneNumberDetails) {
        validatePhoneNumber(phoneNumberDetails.getPhoneNumber());
        repository.findById(id).map(phoneNumber -> {
            phoneNumber.setShortcutName(phoneNumberDetails.getShortcutName());
            phoneNumber.setFirstName(phoneNumberDetails.getFirstName());
            phoneNumber.setLastName(phoneNumberDetails.getLastName());
            phoneNumber.setCountryKey(phoneNumberDetails.getCountryKey());
            phoneNumber.setPhoneNumber(phoneNumberDetails.getPhoneNumber());
            phoneNumber.setRelation(phoneNumberDetails.getRelation());
            phoneNumber.setAnyDetails(phoneNumberDetails.getAnyDetails());
            return repository.save(phoneNumber);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Phone number not found"));
    }

    public void deletePhoneNumber(UUID id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Phone number not found");
        }
    }
}
