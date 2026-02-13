package com.miraisense.server.mapper;

import com.miraisense.server.dto.TaskRequest;
import com.miraisense.server.dto.TaskResponse;
import com.miraisense.server.entity.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {
    public Task toEntity(TaskRequest taskRequest){
        Task task = new Task();
        task.setTitle(taskRequest.title());
        task.setDescription(taskRequest.description());
        
        // Only set priority if it's not null, otherwise use default
        if (taskRequest.priority() != null) {
            task.setPriority(taskRequest.priority());
        }
        
        task.setDueDate(taskRequest.dueDate());
        
        // Only set status if it's not null, otherwise use default
        if (taskRequest.status() != null) {
            task.setStatus(taskRequest.status());
        }
        
        return task;
    }
    public TaskResponse toResponse(Task task){
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getDueDate(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}
