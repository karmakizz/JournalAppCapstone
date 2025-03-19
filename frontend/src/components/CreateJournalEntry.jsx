import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreateAnEntry.css';

function CreateJournal({ onJournalCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Happy');
  const [visibility, setVisibility] = useState('private');

  const handleSubmit = (e) => {
    e.preventDefault();

    const journalData = { title, content, mood, visibility };  

    axios.post('http://localhost:7777/api/journals', journalData)
      .then((response) => {
        console.log("Journal created:", response.data);
        if (onJournalCreated) onJournalCreated();
      })
      .catch((error) => {
        console.error("There was an error creating the journal!", error);
      });
  };


  return (
    <div className="journal-container">
    <form onSubmit={handleSubmit} className="journal-form">
      <h2 className="journal-title">Create New Journal Entry</h2>
      <label className="journal-label">
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="journal-input"/>
      </label>
      <label className="journal-label">
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="journal-textarea"/>
      </label>
      <label className="journal-label">
        Mood:
        <select value={mood} onChange={(e) => setMood(e.target.value)} required className="journal-select">
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Anxious">Anxious</option>
          <option value="Calm">Calm</option>
          <option value="Excited">Excited</option>
        </select>
      </label>
      <label className="journal-label">
        Visibility:
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)} required className="journal-select">
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </label>
      <button type="submit" className="journal-button">Create Journal</button>
    </form>
    </div>
  );
}

export default CreateJournal;
