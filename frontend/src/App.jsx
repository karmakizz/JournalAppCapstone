import React,{useState} from 'react';
import JournalEntries from './pages/JournalEntries';  // Your new component
import Login from './components/Login';

function App() {
  const [username, setUsername] = useState(null);
  
  return (
    <div className="App">
      {!username ? (
        <Login onLogin={setUsername} />
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
          <JournalEntries />
        </div>
      )}
    </div>
  );
}
export default App;
