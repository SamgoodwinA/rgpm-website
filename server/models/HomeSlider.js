import mongoose from "mongoose";

const HomeSliderSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true, unique: true }, // 1–12
    filePath: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("HomeSlider", HomeSliderSchema);
