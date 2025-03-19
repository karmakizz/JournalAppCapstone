import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/JournalEntries.css';

function JournalEntries() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetchJournals();  // Fetch journals when the component mounts
  }, []);
  const fetchJournals = () => {
    axios.get('http://localhost:7777/api/journals')
      .then((response) => {
        setJournals(response.data);  // Update the state with the fetched journals
      })
      .catch((error) => {
        console.error('Error fetching journals:', error);  // Log any error
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:7777/api/journals/${id}`)
        .then(() => {
            setJournals(journals.filter(journal => journal._id !== id));  // Update state
        })
        .catch(error => console.error("Error deleting journal:", error));
};


return (
  <div className="journal-container">
    <h1 className="journal-title">Journal entries</h1>

    {journals.length === 0 ? (
      <p className="no-entries">No journal entries yet. Start writing!</p>
    ) : (
      <div className="journal-feed">
        {journals.map((journal) => (
          <article key={journal._id} className="journal-post">
            <h2 className="post-title">{journal.title}</h2>
            <p className="post-author">✍️ By {journal.creator?.username || "Anonymous"}</p>
            <p className="post-date">📅 {new Date(journal.createdAt).toDateString()}</p>
            <p className="post-content">
              {journal.content.length > 200 ? `${journal.content.substring(0, 200)}...` : journal.content}
            </p>
            <p className="post-mood">Mood: {journal.mood}</p>
            <p className="post-visibility">Visibility: {journal.visibility}</p>
            <div className="post-actions">
              <button className="read-more">Read More</button>
              <button className="delete-post" onClick={() => handleDelete(journal._id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    )}
  </div>
);
}

export default JournalEntries;
