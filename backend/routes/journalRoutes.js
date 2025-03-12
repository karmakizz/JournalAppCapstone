import express from 'express';
import Journal from '../models/JournalEntry.js'; // Import your model

const router = express.Router();

// Create a new journal entry
router.post('/journals', async (req, res) => {
  const { userId, title, content, mood, visibility } = req.body;

  try {
    const newJournal = new Journal({
      userId,
      title,
      content,
      mood,
      visibility,
    });

    await newJournal.save();
    res.status(201).json(newJournal); // Return the newly created journal entry
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating journal entry', error: err });
  }
});

// Fetch all journal entries
router.get('/journals', async (req, res) => {
  try {
    const journals = await Journal.find();
    res.json(journals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching journal entries', error: err });
  }
});
export default router;
