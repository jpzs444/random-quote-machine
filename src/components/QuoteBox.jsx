import { useEffect, useCallback } from 'react';
import { fetchQuotesData } from '../api/quotes_api';
import { useDispatch, useSelector } from 'react-redux';
import { generate } from '../stores/store';
import { Button } from '../components';

// TODO: Add Bootstrap styles

const QuoteBox = () => {
  const dispatch = useDispatch();
  const quoteText = useSelector((state) => state.quote.value.quoteText)
  const quoteAuthor = useSelector((state) => state.quote.value.quoteAuthor)

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchQuotesData();
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

      dispatch(generate({ quoteText: quoteResult.text, quoteAuthor: quoteResult.author }));

      console.log(quoteResult)
    } catch(error) {
      console.error(error);
    }
  }, [dispatch])

  // Fetch API data on first load
  useEffect(() => {
    fetchData();
  }, [fetchData])

  const handleOnButtonClick = () => {
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
        <Button onButtonClick={handleOnButtonClick}/>
      </div>
    </div>
  )
}

export default QuoteBox