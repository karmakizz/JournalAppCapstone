import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import VisionBoardItem from "../models/VisionBoard.js";
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for Memory Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all vision board items
router.get("/", async (req, res) => {
  try {
    const items = await VisionBoardItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new vision board item
router.post("/", async (req, res) => {
  const { text, image, position, size } = req.body;

  try {
    const newItem = new VisionBoardItem({ text, image, position, size });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT (update) an existing vision board item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await VisionBoardItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE an item
router.delete("/:id", async (req, res) => {
  try {
    await VisionBoardItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Image Upload Route
router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    console.log("Uploading to Cloudinary...");

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "visionboard_images", resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("Cloudinary upload success:", result.secure_url);
            resolve(result);
          }
        }
      ).end(req.file.buffer);
    });

    res.status(200).json({ filePath: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

export default router;