import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import axios from 'axios';
import journalRoutes from './routes/journalRoutes.js'; // Import routes
import userRoutes from './routes/usersRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 7777;


const fallbackQuotes = [
  { q: "Success is not final, failure is not fatal: it is the courage to continue that counts.", a: "Winston Churchill" },
  { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
  { q: "Act as if what you do makes a difference. It does.", a: "William James" }
];

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON


// Using journal routes
app.use('/api', journalRoutes);
app.use('/api', userRoutes);  // Register user routes

app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid API response");
    }

    res.json(response.data);  // Send API quote
  } catch (error) {
    console.error("Error fetching quote:", error.message);

    // Fallback to a random local quote
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.json([randomQuote]); 
  }
});
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      // User doesn't exist, create one and hash their password
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ username, password: hashedPassword });
      await user.save();
      return res.status(201).json({ message: 'User registered and logged in', user });
    }

    // If user exists, compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    console.log("Connected to database:", mongoose.connection.name);
  })
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
