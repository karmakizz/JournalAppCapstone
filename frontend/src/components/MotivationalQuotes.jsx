import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MotivationalQuotes.css';

const MotivationalQuotes = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('http://localhost:7777/api/quote');  // Call your backend
      const quoteData = response.data[0];  // ZenQuotes returns an array
      setQuote(quoteData.q);
      setAuthor(quoteData.a);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleRefreshQuote = () => {
    // Call the same function to get a new quote on button click
    fetchQuote();
  };

  
  return (
    <div className="motivation-container">
      <div className="quote-box">
        <blockquote className="quote-text">"{quote}"</blockquote>
        <p className="quote-author">- {author}</p>
        <button className="refresh-button" onClick={handleRefreshQuote}>Get New Quote</button>
      </div>
    </div>
  );
};

export default MotivationalQuotes;
