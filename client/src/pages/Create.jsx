import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, updateTask, fetchTaskById } from "../api/taskApi";

function Create() {
  const { id } = useParams(); // Get task ID from URL if editing
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
    dueDate: "",
  });

  // Load task data if editing
  useEffect(() => {
    if (id) {
      loadTask();
    }
  }, [id]);

  async function loadTask() {
    try {
      const task = await fetchTaskById(id);
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate || "",
      });
    } catch (err) {
      console.error("Error loading task:", err);
      alert("Failed to load task");
    }
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Edit existing task
        await updateTask(id, formData);
        alert("Task updated successfully!");
      } else {
        // Create new task
        await createTask(formData);
        alert("Task created successfully!");
      }
      navigate("/dashboard"); // Go back to dashboard
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <div className="create-card">
        <h2>{id ? "Edit Task" : "Create Task"}</h2>

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-section title">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              required
            />
          </div>

          <div className="form-section description">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe the task"
            />
          </div>

          <div className="form-row">
            <div className="form-section priority">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            <div className="form-section status">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REVIEW">Review</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="create-submit-btn" disabled={loading}>
              {loading ? "Saving..." : id ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
