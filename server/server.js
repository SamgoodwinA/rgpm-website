// server/server.js
import express from "express";
import mongoose from "mongoose";
import homeSliderRoutes from "./routes/homeSlider.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";


// ROUTES (ESM imports ONLY)
import ministryRoutes from "./routes/ministry.js";
import authRoutes from "./routes/auth.js";
import newsRoutes from "./routes/news.js";
import mediaRoutes from "./routes/media.js";

dotenv.config();

const app = express();

// __dirname fix for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// STATIC FILES (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// 🔽 FORCE DOWNLOAD ROUTE (PDF ONLY)
app.get("/api/media/download/:filename", (req, res) => {
  const filePath = path.join(
    __dirname,
    "uploads",
    "media",
    req.params.filename
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  res.download(filePath, req.params.filename);
});


// ENV CHECK
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not set in .env");
  process.exit(1);
}

// DATABASE
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected");
} catch (err) {
  console.error("❌ MongoDB Error:", err.message);
  process.exit(1);
}

// ROUTES
app.use("/api/home-slider", homeSliderRoutes);
app.use("/api/ministry", ministryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/media", mediaRoutes);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
