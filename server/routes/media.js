import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Media from "../models/Media.js";

const router = express.Router();

const uploadDir = "server/uploads/media";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const replaceFile =
      req.body && req.body.replaceFile
        ? path.basename(req.body.replaceFile.trim())
        : null;

    if (replaceFile) {
      const targetPath = path.join(uploadDir, replaceFile);

      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath); // 🔥 DELETE OLD FILE FIRST
      }

      cb(null, replaceFile); // ✅ FORCE SAME NAME
    } else {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const items = await Media.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch media" });
  }
});

/* 🔥 ONLY CHANGE: upload.single → upload.any (REQUIRED FOR MULTIPLE FILES) */
router.post("/", upload.any(), async (req, res) => {
  try {
    const youtubeUrl = (req.body.youtubeUrl || "").trim();
    const text = req.body.text || "";
    const replaceFile = (req.body.replaceFile || "").trim();

    /* ======================================================
       🆕 NEW FEATURE: REPLACE ALL BOOK PAGES (book1 → book20)
       ====================================================== */
    if (req.body.replaceAllBooks === "true" && req.files?.length) {

      for (let i = 0; i < req.files.length; i++) {
        const filename = `book${i + 1}.jpg`;
        const targetPath = path.join(uploadDir, filename);

        if (fs.existsSync(targetPath)) {
          fs.unlinkSync(targetPath);
        }

        fs.renameSync(req.files[i].path, targetPath);

        const existing = await Media.findOne({
          type: "image",
          filePath: `/uploads/media/${filename}`
        });

        if (existing) {
          existing.text = text;
          existing.createdAt = new Date();
          await existing.save();
        } else {
          await Media.create({
            type: "image",
            filePath: `/uploads/media/${filename}`,
            text
          });
        }
      }

      return res.json({ success: true });
    }
    /* ===================== END NEW FEATURE ===================== */

    // ✅ YOUTUBE (UNCHANGED)
    if (youtubeUrl) {
      const item = await Media.create({
        type: "youtube",
        youtubeUrl,
        text
      });
      return res.json({ item });
    }

    // 🔁 BACKWARD COMPATIBILITY FOR upload.any()
    const file = req.files?.[0];
    if (!file) {
      return res.status(400).json({ message: "File required" });
    }

    const filePath = `/uploads/media/${file.filename}`;
    const mime = file.mimetype;

    // ✅ PDF REPLACE LOGIC — FINAL & SAFE (UNCHANGED)
    if (mime === "application/pdf") {

      let existing = await Media.findOne({ type: "pdf" });

      if (existing) {
        const oldPdfPath = path.join(
          uploadDir,
          path.basename(existing.filePath)
        );

        if (fs.existsSync(oldPdfPath)) {
          fs.unlinkSync(oldPdfPath);
        }

        existing.filePath = filePath;
        existing.text = text;
        existing.createdAt = new Date();
        await existing.save();

        return res.json({ item: existing });
      }

      const item = await Media.create({
        type: "pdf",
        filePath,
        text
      });

      return res.json({ item });
    }

    // ✅ IMAGE REPLACE LOGIC (UNCHANGED)
    if (replaceFile) {
      const existing = await Media.findOne({
        type: "image",
        filePath: `/uploads/media/${replaceFile}`
      });

      if (existing) {
        existing.text = text;
        await existing.save();
        return res.json({ item: existing });
      }
    }

    // ✅ NORMAL IMAGE / VIDEO UPLOAD (UNCHANGED)
    const type = mime.startsWith("video") ? "video" : "image";
    const item = await Media.create({
      type,
      filePath,
      text
    });

    res.json({ item });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const doc = await Media.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });

    await Media.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
