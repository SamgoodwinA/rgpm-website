import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import MinistryItem from "../models/MinistryItem.js";

dotenv.config();

const data = [];

const gospelImages = [
"d4.jpg.jpg","d5.jpg.jpg","dg.jpg.jpg","simon3.jpg","dq.jpg.jpg","dt.jpg.jpg","samsam3.jpg","d6.jpg","samsam1.jpg","samsam222.jpg","simon72.jpg","mln.jpg","samsam21.jpg","samsam20.jpg","simon45.jpg","jann2.jpg","jann1.jpg","edwat1.jpg","simon1.jpg","simon2.jpg","simon5.jpg","simon29.jpg","simon30.jpg","simon33.jpg","samsam.24.jpg","simon42.jpg","simon43.jpg","simon64.jpg","simon35.jpg","simon74.jpg","simon75.jpg","simon51.jpg"
];
const gospelVideos = [
"video_2022-11-29_23-16-57.mp4","video_2022-11-29_23-20-41.mp4","video_2022-11-29_23-20-56.mp4","VID-20220524-WA0026.mp4"
];

const childrenImages = [
"j4.jpg","j5.jpg","hj.jpg","j9.jpg","samsam19.jpg","samsam6.jpg","samsam15.jpg","samsam11.jpg","samsam12.jpg","samsam13.jpg","samsam14.jpg","samsam15,jpg.jpg","lkmm.jpg","mln1.jpg","samsam5.jpg","samsam4.jpg","simon50.jpg","simon18.jpg","simon25.jpg","simon26.jpg"
];
const childrenVideos = ["VID-20220423-WA0005.mp4"];

const churchImages = [
"k9.jpg","k8.jpg","k1.jpg","k7.jpg","simon66.jpg","k6.jpg","k5.jpg","k4.jpg","k2.jpg","n6.jpg","simon27.jpg","simon7.jpg","shalom3.jpg","shalom4.jpg","shalom5.jpg","shalom6.jpg","samanjel.jpg"
];
const churchVideos = ["video_2022-11-29_23-17-26.mp4"];

gospelImages.forEach(fn => data.push({
  section: "gospel",
  type: "image",
  filePath: `/uploads/ministry/images/${fn}`,
  filename: fn,
  createdAt: new Date()
}));
gospelVideos.forEach(fn => data.push({
  section: "gospel",
  type: "video",
  filePath: `/uploads/ministry/videos/${fn}`,
  filename: fn,
  createdAt: new Date()
}));
childrenImages.forEach(fn => data.push({
  section: "children",
  type: "image",
  filePath: `/uploads/ministry/images/${fn}`,
  filename: fn,
  createdAt: new Date()
}));
childrenVideos.forEach(fn => data.push({
  section: "children",
  type: "video",
  filePath: `/uploads/ministry/videos/${fn}`,
  filename: fn,
  createdAt: new Date()
}));
churchImages.forEach(fn => data.push({
  section: "church",
  type: "image",
  filePath: `/uploads/ministry/images/${fn}`,
  filename: fn,
  createdAt: new Date()
}));
churchVideos.forEach(fn => data.push({
  section: "church",
  type: "video",
  filePath: `/uploads/ministry/videos/${fn}`,
  filename: fn,
  createdAt: new Date()
}));

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.db.collection("ministryitems").deleteMany({});
    await MinistryItem.insertMany(data);
    console.log("Seed complete");
    process.exit(0);
  } catch (err) {
    console.error("Seed error", err);
    process.exit(1);
  }
};
run();
