import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  type: { type: String, required: true }, // image | video | youtube
  filePath: String,
  youtubeUrl: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("News", newsSchema);
