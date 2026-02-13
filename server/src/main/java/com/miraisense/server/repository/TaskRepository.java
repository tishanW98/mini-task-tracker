package com.miraisense.server.repository;

import com.miraisense.server.entity.Priority;
import com.miraisense.server.entity.Status;
import com.miraisense.server.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(Status status);
    List<Task> findByPriority(Priority priority);
}
