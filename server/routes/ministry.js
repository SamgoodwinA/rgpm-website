import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import MinistryItem from "../models/MinistryItem.js";
import { requireAdmin } from "../middleware/auth.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsRoot = path.join(__dirname, "..", "uploads", "ministry");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const section = (req.body.section || "gospel").toLowerCase();
      const isVideo = file.mimetype.startsWith("video");
      const folder = isVideo ? "videos" : "images";
      const dest = path.join(uploadsRoot, folder);
      await fs.mkdir(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "_" + Math.random().toString(36).slice(2,8);
    const safe = file.originalname.replace(/\s+/g, "_");
    cb(null, `${file.fieldname}_${unique}_${safe}`);
  }
});
const upload = multer({ storage });

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await MinistryItem.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
});

router.get("/:section", async (req, res) => {
  try {
    const section = (req.params.section || "").toLowerCase();
    if (!["gospel","children","church"].includes(section)) return res.status(400).json({ success:false, message:"Invalid section" });
    const items = await MinistryItem.find({ section }).sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
});

router.post("/", requireAdmin, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success:false, message:"No file uploaded" });
    const section = (req.body.section || "gospel").toLowerCase();
    if (!["gospel","children","church"].includes(section)) return res.status(400).json({ success:false, message:"Invalid section" });
    const isVideo = req.file.mimetype.startsWith("video");
    const type = isVideo ? "video" : "image";
    const publicPath = `/uploads/ministry/${isVideo ? "videos" : "images"}/${req.file.filename}`;
    const doc = await MinistryItem.create({
      section,
      type,
      filePath: publicPath,
      filename: req.file.filename,
      originalName: req.file.originalname
    });
    res.json({ success:true, item: doc });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const item = await MinistryItem.findById(id);
    if (!item) return res.status(404).json({ success:false, message:"Not found" });
    const diskPath = path.join(__dirname, "..", item.filePath.replace("/uploads/", "uploads/"));
    try { await fs.unlink(diskPath); } catch (e) {}
    await MinistryItem.deleteOne({ _id: id });
    res.json({ success:true });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
});

export default router;
