import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    notes: { type: String, default: "" },
    list: { type: String, default: "General", index: true }, // category
    dueAt: { type: Date, default: null },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
