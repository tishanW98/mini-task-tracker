import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import { fetchTasks, deleteTask, updateTaskStatus } from "../api/taskApi";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = "John Doe";
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Fetch all tasks once, then filter locally for display
  useEffect(() => {
    loadTasks();
  }, [activeTab]);

  async function loadTasks() {
    setLoading(true);
    try {
      const statusMap = {
        all: null,
        TODO: "TODO",
        IN_PROGRESS: "IN_PROGRESS",
        DONE: "DONE",
      };
      
      // Always fetch all tasks for completion calculation
      const allData = await fetchTasks(null);
      setAllTasks(allData);
      
      // Filter for display based on active tab
      if (statusMap[activeTab] === null) {
        setTasks(allData);
      } else {
        const filtered = allData.filter((t) => t.status === statusMap[activeTab]);
        setTasks(filtered);
      }
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  }

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

  // Calculate completion from ALL tasks, not just filtered ones
  const doneCount = allTasks.filter((t) => t.status === "DONE").length;
  const completionPercentage =
    allTasks.length > 0 ? Math.round((doneCount / allTasks.length) * 100) : 0;

  const tabs = [
    { key: "all", label: "All" },
    { key: "TODO", label: "Todo" },
    { key: "IN_PROGRESS", label: "In Progress" },
    { key: "DONE", label: "Completed" },
  ];

  return (
    <div className="grid grid-cols-[280px_1fr] h-screen bg-slate-100 max-lg:grid-cols-1">
      {/* Sidebar */}
      <aside className="bg-violet-50 border-r border-slate-200 p-6 flex flex-col items-center justify-between max-lg:hidden">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center text-3xl font-semibold text-slate-500">
            {userName.charAt(0)}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-medium text-slate-700 mb-1">
              Hello, {userName}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              You completed{" "}
              <span className="font-semibold text-slate-700">
                {completionPercentage}%
              </span>{" "}
              tasks today
            </p>
          </div>
        </div>
        <button className="w-full py-2 px-4 rounded-md bg-sky-500 text-white font-medium text-sm hover:bg-sky-600 transition-colors cursor-pointer">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden">
        {/* Header */}
        <div className="bg-sky-50 border-b border-teal-200 px-6 py-3 flex justify-between items-center">
          <div>
            <h3 className="font-medium text-slate-700">Today Tasks List</h3>
            <span className="text-sm text-slate-500">{todayDate}</span>
          </div>
          <button
            className="py-2 px-4 rounded-md bg-sky-500 text-white font-medium text-sm hover:bg-sky-600 transition-colors cursor-pointer"
            onClick={() => navigate("/create")}
          >
            + Create Task
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b-2 border-slate-200 px-6 flex gap-2 h-[50px] items-center shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`py-3 px-6 bg-transparent text-sm font-medium border-b-3 -mb-[2px] transition-all relative cursor-pointer ${
                activeTab === tab.key
                  ? "text-sky-500 border-sky-500"
                  : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tasks */}
        <div className="bg-amber-50 p-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {loading ? (
              <p className="text-center py-8 text-slate-400 text-[15px]">
                Loading tasks...
              </p>
            ) : tasks.length === 0 ? (
              <p className="text-center py-8 text-slate-400 text-[15px]">
                No tasks found.
              </p>
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

        {/* Footer */}
        <div className="bg-rose-50 border-t border-violet-200 px-6 py-3 flex items-center gap-6 text-xs text-slate-500">
          <span className="font-medium text-slate-600">Priority:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Low</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
