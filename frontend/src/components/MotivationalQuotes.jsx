import { useState, useEffect } from 'react';
import axios from 'axios';

const MotivationalQuotes = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
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

    fetchQuote();
  }, []);

  return (
    <div>
      <blockquote>"{quote}"</blockquote>
      <p>- {author}</p>
    </div>
  );
};

export default MotivationalQuotes;
