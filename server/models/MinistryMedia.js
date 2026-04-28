import mongoose from "mongoose";

const ministryMediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    category: {
      type: String,
      enum: ["gospel", "children", "church"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MinistryMedia", ministryMediaSchema);
