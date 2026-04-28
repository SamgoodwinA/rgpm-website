// server/routes/news.js
import express from "express";
import multer from "multer";
import path from "path";
import News from "../models/News.js";

const router = express.Router();

/* ---------------- STORAGE ---------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "server/uploads/news");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  }
});

const upload = multer({ storage });

/* ---------------- GET (PUBLIC) ---------------- */
router.get("/", async (req, res) => {
  try {
    const items = await News.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error("GET /api/news error:", err);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

/* ---------------- POST (ADMIN) ---------------- */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { youtubeUrl, text } = req.body;

    // YOUTUBE ONLY
    if (youtubeUrl) {
      const item = await News.create({
        type: "youtube",
        youtubeUrl,
        text
      });
      return res.json({ item });
    }

    // FILE UPLOAD
    if (!req.file) {
      return res.status(400).json({ message: "File missing" });
    }

    const mime = req.file.mimetype;
    const type = mime.startsWith("video") ? "video" : "image";

    const item = await News.create({
      type,
      filePath: `/uploads/news/${req.file.filename}`,
      text
    });

    res.json({ item });

  } catch (err) {
    console.error("POST /api/news error:", err);
    res.status(500).json({ message: err.message || "Upload failed" });
  }
});

/* ---------------- DELETE ---------------- */
router.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
