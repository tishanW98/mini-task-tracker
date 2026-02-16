import { useState } from "react";

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    HIGH: "#ff6b9d",
    MEDIUM: "#ffc93c",
    LOW: "#7bed9f",
    CRITICAL: "#e74c3c",
  };

  const statusLabels = {
    TODO: "Todo",
    IN_PROGRESS: "In Progress",
    REVIEW: "Review",
    DONE: "Done",
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md"
      style={{ borderLeft: `4px solid ${priorityColors[task.priority] || "#ccc"}` }}
    >
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 items-center">
        {/* Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.status === "DONE"}
            onChange={() => onToggleComplete?.(task.id, task.status)}
            className="w-5 h-5 cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Title + Toggle */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium text-slate-700 flex-1">
              {task.title}
            </span>
            <button
              className="p-1 bg-transparent text-slate-500 flex items-center justify-center rounded hover:bg-slate-100 transition-colors cursor-pointer"
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
          {task.dueDate && (
            <div className="flex items-center gap-1.5 mt-1">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-slate-400">
                <path
                  d="M12.667 2.667H3.333c-.736 0-1.333.597-1.333 1.333v9.333c0 .737.597 1.334 1.333 1.334h9.334c.736 0 1.333-.597 1.333-1.334V4c0-.736-.597-1.333-1.333-1.333ZM2 5.333h12M5.333 1.333v2.667M10.667 1.333v2.667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs text-slate-500">
                Due: {new Date(task.dueDate).toLocaleDateString("en-US", { 
                  month: "short", 
                  day: "numeric", 
                  year: "numeric" 
                })}
              </span>
            </div>
          )}
        </div>

        {/* Actions + Status */}
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-2">
            <button
              className="p-1.5 bg-transparent rounded-md flex items-center justify-center transition-colors text-slate-500 hover:bg-blue-100 hover:text-blue-500 cursor-pointer"
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
              className="p-1.5 bg-transparent rounded-md flex items-center justify-center transition-colors text-slate-500 hover:bg-red-100 hover:text-red-500 cursor-pointer"
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
          <div className="py-1 px-3 rounded-xl bg-slate-100 text-xs font-medium capitalize">
            <span className="text-slate-500">
              {statusLabels[task.status] || task.status}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Description */}
      {isExpanded && (
        <div className="pr-4 pb-4 pl-13 animate-slide-down">
          <p className="p-3 bg-slate-50 rounded-md text-sm text-slate-500 leading-relaxed">
            {task.description || "No description provided."}
          </p>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
