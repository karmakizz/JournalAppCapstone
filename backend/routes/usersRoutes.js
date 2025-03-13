import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Log the received data to check if everything is correct
      console.log("Received data:", { username, email, password });

      const newUser = new User({
        username,
        email,
        password,
      });

      await newUser.save();
      res.status(201).json(newUser);  // Return the newly created user
    } catch (err) {
      console.error("Error creating user:", err);  // Log detailed error
      res.status(500).json({ message: 'Error creating user', error: err });
    }
  });

// Fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});
export default router;
