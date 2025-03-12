const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 7777;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',  // Allow only this origin
  }));
app.use(express.json());  // to parse incoming JSON requests
// Example route for fetching journal entries

app.get('/api/journal', (req, res) => {
    // You can replace this with actual data retrieval logic from MongoDB
    res.json({ message: 'Journal entries would be here' });
  });
  

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
