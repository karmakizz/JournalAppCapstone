import React, { useState } from 'react';
import axios from 'axios';

function CreateJournal({ onJournalCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Happy');
  const [visibility, setVisibility] = useState('private');

  const handleSubmit = (e) => {
    e.preventDefault();
    const journalData = { title, content, mood, visibility, userId: "someUserId" };  // Replace "someUserId" with the actual user ID

    axios.post('http://localhost:7777/api/journals', journalData)
      .then((response) => {
        console.log("Journal created:", response.data);
        onJournalCreated();  // Call the function to refresh the list of journals
      })
      .catch((error) => {
        console.error("There was an error creating the journal!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Journal Entry</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </label>
      <label>
        Mood:
        <select value={mood} onChange={(e) => setMood(e.target.value)} required>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Anxious">Anxious</option>
          <option value="Calm">Calm</option>
          <option value="Excited">Excited</option>
        </select>
      </label>
      <label>
        Visibility:
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)} required>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </label>
      <button type="submit">Create Journal</button>
    </form>
  );
}

export default CreateJournal;
