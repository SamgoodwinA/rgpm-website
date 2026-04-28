import mongoose from "mongoose";

const MinistrySchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: ["gospel", "children", "church"],
    lowercase: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ["image", "video"],
    lowercase: true,
    trim: true
  },
  filePath: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Ministry || mongoose.model("Ministry", MinistrySchema);
