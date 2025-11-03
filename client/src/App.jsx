import React, { useEffect, useMemo, useState } from "react";
import { fetchTasks } from "./api";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

export default function App() {
  // -----------------------------
  // 🌓 Theme Handling
  // -----------------------------
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  // -----------------------------
  // ✅ Task Management State
  // -----------------------------
  const [tasks, setTasks] = useState([]);
  const [list, setList] = useState(""); // filter
  const [status, setStatus] = useState("all"); // all | completed | pending
  const [q, setQ] = useState("");

  const load = async () => {
    const { data } = await fetchTasks({ list, status, q });
    setTasks(data);
  };

  useEffect(() => {
    load();
  }, [list, status, q]);

  const lists = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.list || "General"))),
    [tasks]
  );

  // -----------------------------
  // 🎨 UI
  // -----------------------------
  return (
    <div className="container">
      {/* Header Section */}
      <div className="panel header">
        <h1>📝 To-Do Web App</h1>

        <div className="row">
          <input
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select value={list} onChange={(e) => setList(e.target.value)}>
            <option value="">All Lists</option>
            {lists.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button className="ghost" onClick={load}>
            Refresh
          </button>

          {/* 🌗 Theme Toggle Button */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* Task Creation Form */}
      <TaskForm onCreated={(t) => setTasks((cur) => [t, ...cur])} />

      {/* Task List */}
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
