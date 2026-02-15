const API_URL = "http://localhost:8081/api/tasks";

// Get all tasks (optionally filter by status)
export async function fetchTasks(status) {
  const url = status ? `${API_URL}?status=${status}` : API_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

// Delete a task
export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}

// Update task status
export async function updateTaskStatus(id, status) {
  const res = await fetch(`${API_URL}/${id}/status?status=${status}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}
