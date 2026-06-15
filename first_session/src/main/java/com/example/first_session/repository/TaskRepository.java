package com.example.first_session.repository;

import com.example.first_session.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


    @Repository
    public interface TaskRepository extends JpaRepository<Task, Long> {
        // بوراثة JpaRepository، حصلنا الآن على:
        // save(), findById(), findAll(), deleteById(), وغيرها الكثير!
    }


