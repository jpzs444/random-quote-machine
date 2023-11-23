import { useEffect, useCallback } from 'react';
import { fetchQuotesData } from '../api/quotes_api';
import { useDispatch, useSelector } from 'react-redux';
import { generate } from '../stores/store';
import { Button } from '../components';
import { quotationMark, twitter } from '../assets'

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
    <div className='container d-flex justify-content-center align-items-center'>
      <div id="quote-box" className="card p-2 position-relative shadow-sm">
        <div className="card-body">
          <div className="card-text text-focus-in" key={quoteText}>
            <h1 id="text" className='fs-2 position-relative z-2'>{quoteText}</h1>
            <p id="author" className='pt-3'>— {quoteAuthor}</p>
          </div>
          <hr/>
          <div className='d-flex justify-content-between'>
            <a 
              id="tweet-quote" 
              href={`https://www.twitter.com/intent/tweet?hashtags=quotes&text="${quoteText}"%20—${quoteAuthor}`}
            >
              <img src={twitter} alt="tweet-quote"
              width={32}
              className="twitter-img" />
            </a>
            <Button onButtonClick={handleOnButtonClick}/>
          </div>
        </div>
        <img src={quotationMark} alt="quotation-mark" width={100} className="quotation-mark-img position-absolute z-0"/>
      </div>
    </div>
  )
}

export default QuoteBox