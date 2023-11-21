import React from "react";
import { fetchQuotesData } from "../api/quotes_api";

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteText: '',
      quoteAuthor: '',
    }

    this.handleOnClick = this.handleOnClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = async () => {
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

      // setState
      this.setState({
        quoteText: quoteResult.text,
        quoteAuthor: quoteResult.author,
      })

      console.log(quoteResult)
    } catch(error) {
      console.error(error);
    }
  }
  
  componentDidMount() {
    this.fetchData();
  }

  handleOnClick() {
    this.fetchData();
  }
    
  render() {
    return (
      <div id="quote-box">
        <h1 id="text">{this.state.quoteText}</h1>
        <p id="author">{this.state.quoteAuthor}</p>
        <div>
          <a id="tweet-quote" href="/">Twitter</a>
          <button 
              id="new-quote" 
              type="button"
              onClick={this.handleOnClick}
            >
              New Quote
          </button>
        </div>
      </div>
    )
  }
}

export default QuoteBox