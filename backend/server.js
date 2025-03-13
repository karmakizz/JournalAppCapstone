import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import journalRoutes from './routes/journalRoutes.js'; // Import routes
import userRoutes from './routes/usersRoutes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 7777;

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON

// Using journal routes
app.use('/api', journalRoutes);
app.use('/api', userRoutes);  // Register user routes

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    console.log("Connected to database:", mongoose.connection.name);
  })
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
