import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateJournal from '../components/CreateJournalEntry';  // Import the new form component

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

const handleJournalCreated = () => {
  fetchJournals();  // Fetch updated list of journals after a new one is created
};


  return (
    <div>
      <h1>Journal Entries</h1>
      <CreateJournal onJournalCreated={handleJournalCreated} />  {/* Add the CreateJournal form */}
      <ul>
        {journals.length === 0 ? (
          <p>No journals available</p>
        ) : (
          journals.map((journal) => (
            <li key={journal._id}>
              <h2>{journal.title}</h2>
              <p>{journal.content}</p>
              <p><strong>Mood:</strong> {journal.mood}</p>
              <p><strong>Visibility:</strong> {journal.visibility}</p>
              <button onClick={() => handleDelete(journal._id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default JournalEntries;
