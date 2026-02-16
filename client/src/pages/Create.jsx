import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, updateTask, fetchTaskById } from "../api/taskApi";

function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
    dueDate: "",
  });

  useEffect(() => {
    if (id) loadTask();
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
        await updateTask(id, formData);
        alert("Task updated successfully!");
      } else {
        await createTask(formData);
        alert("Task created successfully!");
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] bg-slate-50 rounded-lg border border-slate-200 p-8">
        <h2 className="text-2xl font-semibold text-slate-700 text-center mb-6">
          {id ? "Edit Task" : "Create Task"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title */}
          <div className="p-4 rounded-md border border-sky-200 bg-sky-50">
            <label className="block text-sm text-slate-600 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              required
              className="w-full py-2 px-3 border border-slate-300 rounded-md outline-none focus:ring-3 focus:ring-slate-300/30"
            />
          </div>

          {/* Description */}
          <div className="p-4 rounded-md border border-amber-200 bg-amber-50">
            <label className="block text-sm text-slate-600 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe the task"
              className="w-full py-2 px-3 border border-slate-300 rounded-md outline-none resize-none focus:ring-3 focus:ring-slate-300/30"
            />
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <div className="p-4 rounded-md border border-rose-200 bg-rose-50">
              <label className="block text-sm text-slate-600 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full py-2 px-3 border border-slate-300 rounded-md outline-none focus:ring-3 focus:ring-slate-300/30"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            <div className="p-4 rounded-md border border-violet-200 bg-violet-50">
              <label className="block text-sm text-slate-600 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full py-2 px-3 border border-slate-300 rounded-md outline-none focus:ring-3 focus:ring-slate-300/30"
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REVIEW">Review</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div className="p-4 rounded-md border border-slate-200">
            <label className="block text-sm text-slate-600 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-slate-300 rounded-md outline-none focus:ring-3 focus:ring-slate-300/30"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className="flex-1 py-2.5 px-6 rounded-md bg-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-300 transition-colors cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 px-6 rounded-md bg-sky-500 text-white font-medium text-sm hover:bg-sky-600 transition-colors cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : id ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
