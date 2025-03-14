import express from 'express';
import Journal from '../models/JournalEntry.js'; // Import your model


const router = express.Router();

// Create a new journal entry
router.post('/journals', async (req, res) => {
  try {
    //console.log("Received data:", req.body);  // Debugging line

    const { title, content, mood, visibility, userId } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newJournal = new Journal({ title, content, mood, visibility, userId: userId || null });
    await newJournal.save();

    res.status(201).json(newJournal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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

// Delete a journal entry
router.delete('/journals/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await Journal.findByIdAndDelete(id);
      res.status(200).json({ message: "Journal entry deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: "Error deleting journal entry" });
  }
});

export default router;
