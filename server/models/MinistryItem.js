import mongoose from "mongoose";

const MinistryItemSchema = new mongoose.Schema({
  section: { type: String, required: true, enum: ["gospel","children","church"] },
  type: { type: String, required: true, enum: ["image","video"] },
  filePath: { type: String, required: true },
  filename: { type: String, required: true },
  originalName: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.MinistryItem || mongoose.model("MinistryItem", MinistryItemSchema);
