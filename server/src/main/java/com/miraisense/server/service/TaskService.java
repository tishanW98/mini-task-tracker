package com.miraisense.server.service;

import com.miraisense.server.dto.TaskRequest;
import com.miraisense.server.dto.TaskResponse;
import com.miraisense.server.entity.Priority;
import com.miraisense.server.entity.Status;

import java.util.List;

public interface TaskService {
    TaskResponse createTask(TaskRequest taskRequest);

    List<TaskResponse> getAllTasks();

    List<TaskResponse> getTasksByStatus(Status status);
    List<TaskResponse> getTasksByPriority(Priority priority);

    TaskResponse getTaskById(Long id);
    TaskResponse updateTask(Long id, TaskRequest taskRequest);
    TaskResponse updateTaskStatus(Long id, Status status);

    void deleteTask(Long id);
    boolean existsById(Long id);
}
