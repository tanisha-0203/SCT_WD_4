import React, { useState } from "react";
import dayjs from "dayjs";
import { deleteTask, toggleTask, updateTask } from "../api";

export default function TaskItem({ task, onChanged, onRemoved }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: task.title,
    notes: task.notes || "",
    list: task.list || "General",
    dueAt: task.dueAt ? task.dueAt.slice(0, 16) : ""
  });

  const save = async () => {
    const payload = {
      ...draft,
      dueAt: draft.dueAt ? new Date(draft.dueAt) : null
    };
    const { data } = await updateTask(task._id, payload);
    setEditing(false);
    onChanged?.(data);
  };

  return (
    <div className="item">
      <div className="meta" style={{ flex: 1 }}>
        {editing ? (
          <>
            <input value={draft.title} onChange={e => setDraft(d => ({...d, title: e.target.value}))}/>
            <div className="row">
              <input value={draft.list} onChange={e => setDraft(d => ({...d, list: e.target.value}))}/>
              <input type="datetime-local" value={draft.dueAt} onChange={e => setDraft(d => ({...d, dueAt: e.target.value}))}/>
            </div>
            <textarea rows={2} value={draft.notes} onChange={e => setDraft(d => ({...d, notes: e.target.value}))}/>
          </>
        ) : (
          <>
            <div className={`title ${task.completed ? "done" : ""}`}>{task.title}</div>
            <div className="badges">
              <span className="badge">List: {task.list || "General"}</span>
              {task.dueAt && <span className="badge">Due {dayjs(task.dueAt).format("DD MMM, HH:mm")}</span>}
              <span className="badge">{task.completed ? "Completed" : "Pending"}</span>
            </div>
            {task.notes && <small>{task.notes}</small>}
          </>
        )}
      </div>

      <div className="actions">
        <button className="success" onClick={async () => onChanged?.((await toggleTask(task._id)).data)}>
          {task.completed ? "Un-done" : "Done"}
        </button>
        {editing ? (
          <>
            <button className="primary" onClick={save}>Save</button>
            <button className="ghost" onClick={() => { setEditing(false); setDraft({ title: task.title, notes: task.notes || "", list: task.list || "General", dueAt: task.dueAt ? task.dueAt.slice(0,16) : "" }); }}>Cancel</button>
          </>
        ) : (
          <button className="ghost" onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="danger" onClick={async () => { await deleteTask(task._id); onRemoved?.(task._id); }}>
          Delete
        </button>
      </div>
    </div>
  );
}
