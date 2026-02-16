import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import { fetchTasks, deleteTask, updateTaskStatus } from "../api/taskApi";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = "John Doe";
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Fetch tasks whenever the active tab changes
  useEffect(() => {
    loadTasks();
  }, [activeTab]);

  async function loadTasks() {
    setLoading(true);
    try {
      // "all" means no filter, otherwise send the backend status value
      const statusMap = {
        all: null,
        TODO: "TODO",
        IN_PROGRESS: "IN_PROGRESS",
        DONE: "DONE",
      };
      const data = await fetchTasks(statusMap[activeTab]);
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  }

  // Checkbox tick → mark as DONE, untick → mark as TODO
  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === "DONE" ? "TODO" : "DONE";
      await updateTaskStatus(taskId, newStatus);
      loadTasks();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (taskId) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );
    
    if (!confirmed) return;

    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/edit/${taskId}`);
  };

  // Calculate completion percentage
  const doneCount = tasks.filter((t) => t.status === "DONE").length;
  const completionPercentage = tasks.length > 0
    ? Math.round((doneCount / tasks.length) * 100)
    : 0;

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-content">
          <div className="profile-avatar">{userName.charAt(0)}</div>
          <div className="profile-greeting">
            <h2>Hello, {userName}</h2>
            <p>
              You completed <span className="percentage">{completionPercentage}%</span> tasks today
            </p>
          </div>
        </div>
        <button className="logout-btn">Logout</button>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h3>Today Tasks List</h3>
            <span className="date">{todayDate}</span>
          </div>
          <button className="create-task-btn" onClick={() => navigate("/create")}>
            + Create Task
          </button>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button 
            className={`tab-btn ${activeTab === "TODO" ? "active" : ""}`}
            onClick={() => setActiveTab("TODO")}
          >
            Todo
          </button>
          <button 
            className={`tab-btn ${activeTab === "IN_PROGRESS" ? "active" : ""}`}
            onClick={() => setActiveTab("IN_PROGRESS")}
          >
            In Progress
          </button>
          <button 
            className={`tab-btn ${activeTab === "DONE" ? "active" : ""}`}
            onClick={() => setActiveTab("DONE")}
          >
            Completed
          </button>
        </div>

        <div className="dashboard-tasks">
          <div className="task-list">
            {loading ? (
              <p className="loading-text">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="empty-text">No tasks found.</p>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleComplete={handleToggleComplete}
                />
              ))
            )}
          </div>
        </div>

        <div className="dashboard-footer">
          <span className="label">Priority:</span>
          <div className="priority-legend">
            <span className="priority-dot priority-critical" />
            <span>Critical</span>
          </div>
          <div className="priority-legend">
            <span className="priority-dot priority-high" />
            <span>High</span>
          </div>
          <div className="priority-legend">
            <span className="priority-dot priority-medium" />
            <span>Medium</span>
          </div>
          <div className="priority-legend">
            <span className="priority-dot priority-low" />
            <span>Low</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
