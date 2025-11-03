import axios from "axios";

// Set this in .env: VITE_API_BASE_URL=http://localhost:5000/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});

export const fetchTasks = (params) => api.get("/tasks", { params });
export const createTask = (payload) => api.post("/tasks", payload);
export const updateTask = (id, payload) => api.patch(`/tasks/${id}`, payload);
export const toggleTask = (id) => api.patch(`/tasks/${id}/toggle`);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
