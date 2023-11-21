import { useState, useEffect } from 'react'
import { fetchQuotesData } from '../api/quotes_api'

// TODO: Try implementing Redux 
// TODO: Add Bootstrap styles

const QuoteBox = () => {
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');

  const fetchData = async () => {
    try {
      const result = await fetchQuotesData();

      // Get a random quote
      const randomNumber = Math.floor(Math.random() * result.length);
      const quoteResult = result[randomNumber]

      // Get author and remove 'type.fit'
      if (quoteResult.author.includes('type.fit')) {
        if (quoteResult.author.length === 8) {
          quoteResult.author = 'Anonymous';
        } else {
          const author = quoteResult.author.slice(0, -10);
          quoteResult.author = author;
        }
      }

      // Set text and author
      setQuoteText(quoteResult.text)
      setQuoteAuthor(quoteResult.author)

      console.log(quoteResult)
    } catch(error) {
      console.error(error);
    }
  }

  // Fetch API data on first load
  useEffect(() => {
    fetchData();
  }, [])

  const handleOnClick = () => {
    fetchData();
  }

  return (
    <div id="quote-box">
      <h1 id="text">{quoteText}</h1>
      <p id="author">{quoteAuthor}</p>
      <div>
        <a 
          id="tweet-quote" 
          href={`https://www.twitter.com/intent/tweet?hashtags=quotes&text="${quoteText}"%20—${quoteAuthor}`}
        >
          Twitter
        </a>
        <button 
          id="new-quote" 
          type="button"
          onClick={handleOnClick}
        >
          New Quote
        </button>
      </div>
    </div>
  )
}

export default QuoteBox