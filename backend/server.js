import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import journalRoutes from './routes/journalRoutes.js';
import userRoutes from './routes/usersRoutes.js';
import VisionBoard from './models/VisionBoard.js';  
import visionBoardRoutes from './routes/VisionBoardRoutes.js';  // Import VisionBoard routes

dotenv.config();

const app = express();
const port = process.env.PORT || 7777;

// Fallback Quotes
const fallbackQuotes = [
  { q: "Success is not final, failure is not fatal: it is the courage to continue that counts.", a: "Winston Churchill" },
  { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
  { q: "Act as if what you do makes a difference. It does.", a: "William James" }
];

// Middleware
app.use(cors());
app.use(express.json());  // ✅ Parses incoming JSON requests

// Using journal & user routes
app.use('/api', journalRoutes);
app.use('/api', userRoutes);
app.use("/api/visionboard", visionBoardRoutes);

// ✅ **Fetch a Quote**
app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid API response");
    }

    res.json(response.data); 
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.json([randomQuote]); 
  }
});

// ✅ **Login/Register a User**
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ username, password: hashedPassword });
      await user.save();
      return res.status(201).json({ message: 'User registered and logged in', user });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

    res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ **Vision Board Routes**
// 📌 **Get all Vision Board Items**
app.get('/api/visionboard', async (req, res) => {
  try {
    const items = await VisionBoard.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vision board items' });
  }
});

// 📌 **Add a New Vision Board Item**
app.post('/api/visionboard', async (req, res) => {
  const { text, image, position, size } = req.body;

  try {
    const newItem = new VisionBoard({ text, image, position, size });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 **Update an Existing Vision Board Item**
app.put('/api/visionboard/:id', async (req, res) => {
  const { id } = req.params;
  const { text, image, position, size } = req.body;

  if (!id) return res.status(400).json({ error: 'Missing item ID' });

  try {
    const updatedItem = await VisionBoard.findByIdAndUpdate(id, { text, image, position, size }, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// 📌 **Delete a Vision Board Item**
app.delete('/api/visionboard/:id', async (req, res) => {
  try {
    await VisionBoard.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ **Cloudinary Configuration**
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ **Multer Setup (File Upload)**
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// 📌 **Upload an Image to Cloudinary**
app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Upload image buffer to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'visionboard_images', resource_type: 'image' },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'Failed to upload image' });
        }

        res.status(200).json({ filePath: result.secure_url }); // Return Cloudinary URL
      }
    ).end(req.file.buffer);  // Send the file buffer

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});
// ✅ **MongoDB Connection**
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    console.log("Connected to database:", mongoose.connection.name);
  })
  .catch(err => console.log(err));

// ✅ **Start the Server**
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
