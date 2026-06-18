package com.example.phonenumberapi.repository;

import com.example.phonenumberapi.model.PhoneNumber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PhoneNumberRepository extends JpaRepository<PhoneNumber, UUID> {
    Optional<List<PhoneNumber>> findByShortcutName(String shortcutName);
}