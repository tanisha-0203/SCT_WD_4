import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, notes, list, dueAt } = req.body;
    const task = await Task.create({ title, notes, list, dueAt });
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { list, q, status } = req.query; // status: all|completed|pending
    const filter = {};
    if (list) filter.list = list;
    if (status === "completed") filter.completed = true;
    if (status === "pending") filter.completed = false;
    if (q) filter.title = { $regex: q, $options: "i" };

    const tasks = await Task.find(filter).sort({ dueAt: 1, createdAt: -1 });
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const task = await Task.findByIdAndUpdate(id, payload, { new: true });
    res.json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
