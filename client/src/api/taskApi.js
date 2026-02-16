const API_URL = "http://localhost:8081/api/tasks";

// Get all tasks (optionally filter by status)
export async function fetchTasks(status) {
  const url = status ? `${API_URL}?status=${status}` : API_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

// Get single task by ID
export async function fetchTaskById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
}

// Create a new task
export async function createTask(taskData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

// Update a task
export async function updateTask(id, taskData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) throw new Error("Failed to update task");
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
