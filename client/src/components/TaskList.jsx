import React from "react";
import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, setTasks }) {
  const onChanged = (updated) =>
    setTasks((cur) => cur.map((t) => (t._id === updated._id ? updated : t)));

  const onRemoved = (id) => setTasks((cur) => cur.filter((t) => t._id !== id));

  return (
    <div className="list">
      {tasks.map((t) => (
        <TaskItem key={t._id} task={t} onChanged={onChanged} onRemoved={onRemoved} />
      ))}
    </div>
  );
}
