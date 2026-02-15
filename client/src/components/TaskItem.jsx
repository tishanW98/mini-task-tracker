import { useState } from "react";

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    HIGH: "#ff6b9d",
    MEDIUM: "#ffc93c",
    LOW: "#7bed9f",
    CRITICAL: "#e74c3c",
  };

  // Show a friendly status label
  const statusLabels = {
    TODO: "Todo",
    IN_PROGRESS: "In Progress",
    REVIEW: "Review",
    DONE: "Done",
  };

  return (
    <div
      className="task-item"
      style={{
        borderLeft: `4px solid ${priorityColors[task.priority] || "#ccc"}`,
      }}
    >
      <div className="task-item-main">
        <div className="task-item-left">
          <input
            type="checkbox"
            checked={task.status === "DONE"}
            onChange={() => onToggleComplete?.(task.id, task.status)}
            className="task-checkbox"
          />
        </div>

        <div className="task-item-middle">
          <div className="task-title-row">
            <span className="task-title">{task.title}</span>
            <button
              className="task-toggle-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="task-item-right">
          <div className="task-actions">
            <button
              className="task-action-btn task-edit-btn"
              onClick={() => onEdit?.(task.id)}
              aria-label="Edit task"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M11.333 2A1.886 1.886 0 0 1 14 4.667l-9 9-3.667 1 1-3.667 9-9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="task-action-btn task-delete-btn"
              onClick={() => onDelete?.(task.id)}
              aria-label="Delete task"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="task-status-badge">
            <span className="task-status-text">{statusLabels[task.status] || task.status}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="task-item-expanded">
          <p className="task-description">
            {task.description || "No description provided."}
          </p>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
