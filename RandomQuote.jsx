import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import twitter_icon from '../Assets/twitter.png';
import reload_icon from '../Assets/reload.png';

export const RandomQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang von Goethe",
  });

  useEffect(() => {
    async function loadQuotes() {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Failed to load quotes", error);
      }
    }
    loadQuotes();
  }, []);

  const random = () => {
    if (quotes.length > 0) {
      const select = quotes[Math.floor(Math.random() * quotes.length)];
      if (select) {
        setQuote(select);
      }
    }
  };

  const twitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author.split(',')[0]}`);
  };

  return (
    <div className='container'>
      <h3>Quote of the Moment</h3>
      <div className="quote">{quote.text}</div>
      <div>
        <div className="line">
          <div className="bottom">
            <div className="author">- {quote.author.split(',')[0]}</div>
            <div className="icons">
              <img src={reload_icon} onClick={random} alt="Reload" />
              <img src={twitter_icon} onClick={twitter} alt="Twitter" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
