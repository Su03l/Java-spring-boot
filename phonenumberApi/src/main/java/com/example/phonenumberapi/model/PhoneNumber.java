package com.example.phonenumberapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "phone_numbers")
public class PhoneNumber {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String shortcutName;

    private String firstName;
    private String lastName;

    @Column(nullable = false, length = 4)
    private String countryKey; // e.g., "SA"

    @Column(nullable = false, length = 10)
    private String phoneNumber; // e.g., "05XXXXXXXX"

    private String relation;
    private String anyDetails;
}
