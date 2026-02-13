package com.miraisense.server.service.impl;

import com.miraisense.server.dto.TaskRequest;
import com.miraisense.server.dto.TaskResponse;
import com.miraisense.server.entity.Priority;
import com.miraisense.server.entity.Status;
import com.miraisense.server.entity.Task;
import com.miraisense.server.exception.TaskNotFoundException;
import com.miraisense.server.mapper.TaskMapper;
import com.miraisense.server.repository.TaskRepository;
import com.miraisense.server.service.TaskService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    @Override
    @Transactional
    public TaskResponse createTask(TaskRequest taskRequest) {
        Task task = taskMapper.toEntity(taskRequest);   // DTO >> Entity
        Task savedTask = taskRepository.save(task);     // Save >> database
        return taskMapper.toResponse(savedTask);        // Entity >> Response DTO
    }

    @Override
    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(taskMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> getTasksByStatus(Status status) {
        return taskRepository.findByStatus(status)
                .stream()
                .map(taskMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> getTasksByPriority(Priority priority) {
        return taskRepository.findByPriority(priority)
                .stream()
                .map(taskMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

        return taskMapper.toResponse(task);
    }

    @Override
    @Transactional
    public TaskResponse updateTask(Long id, TaskRequest taskRequest) {

        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));     // Check task exists

        existingTask.setTitle(taskRequest.title());
        existingTask.setDescription(taskRequest.description());
        existingTask.setPriority(taskRequest.priority());
        existingTask.setDueDate(taskRequest.dueDate());         // Update fields
        existingTask.setStatus(taskRequest.status());

        Task updatedTask = taskRepository.save(existingTask); // Save updated task - updatedAt will be auto-set by @PreUpdate
        return taskMapper.toResponse(updatedTask);
    }

    @Override
    @Transactional
    public TaskResponse updateTaskStatus(Long id, Status status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));
        task.setStatus(status);                             // Update only status
        Task updatedTask = taskRepository.save(task);       // Save

        return taskMapper.toResponse(updatedTask);
    }

    @Override
    @Transactional
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException("Task not found with id: " + id);
        }

        taskRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return taskRepository.existsById(id);
    }
}
