import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  type: { type: String, required: true },
  filePath: String,
  youtubeUrl: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Media", mediaSchema);
