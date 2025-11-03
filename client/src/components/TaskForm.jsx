import React, { useState } from "react";
import dayjs from "dayjs";
import { createTask } from "../api";

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [list, setList] = useState("General");
  const [dueAt, setDueAt] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const payload = { title, notes, list, dueAt: dueAt ? new Date(dueAt) : null };
    const { data } = await createTask(payload);
    onCreated?.(data);
    setTitle(""); setNotes(""); setList("General"); setDueAt("");
  };

  return (
    <form onSubmit={submit} className="panel" style={{ marginTop: 16 }}>
      <div className="row">
        <input
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 2 }}
        />
        <input
          type="datetime-local"
          value={dueAt}
          onChange={(e) => setDueAt(e.target.value)}
          style={{ flex: 1 }}
        />
        <input
          placeholder="List / Category"
          value={list}
          onChange={(e) => setList(e.target.value)}
          style={{ width: 180 }}
        />
        <button className="primary">Add</button>
      </div>
      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        style={{ width: "100%", marginTop: 10 }}
      />
    </form>
  );
}
