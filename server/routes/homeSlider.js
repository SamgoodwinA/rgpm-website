import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import HomeSlider from "../models/HomeSlider.js";

const router = express.Router();

const uploadDir = "server/uploads/home-slider";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

/* ✅ STORAGE — FORCE slideX.jpg ONLY IF INDEX IS VALID */
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const index = Number(req.body.index);

    // 🔥 PROTECT AGAINST NaN
    if (!index || index < 1 || index > 12) {
      return cb(new Error("Invalid slide index"), null);
    }

    cb(null, `slide${index}.jpg`);
  }
});

const upload = multer({ storage });

/* ✅ GET SLIDES */
router.get("/", async (req, res) => {
  const slides = await HomeSlider.find().sort({ index: 1 });
  res.json(slides);
});

/* ✅ INSERT / REPLACE SLIDE */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const index = Number(req.body.index);
    if (!index || index < 1 || index > 12) {
      return res.status(400).json({ message: "Invalid index" });
    }

    const filePath = `/uploads/home-slider/slide${index}.jpg`;

    const existing = await HomeSlider.findOne({ index });

    if (existing) {
      existing.filePath = filePath;
      existing.updatedAt = new Date();
      await existing.save();
    } else {
      await HomeSlider.create({
        index,
        filePath
      });
    }

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Upload failed" });
  }
});

export default router;
