package com.example.taskman.repository;

import com.example.taskman.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // بفضل JpaRepository، لدينا الآن جاهزاً:
    // save(), findAll(), findById(), deleteById(), وغيرها!
}