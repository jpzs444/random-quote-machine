const QUOTES_API_URL = 'https://type.fit/api/quotes';

export const fetchQuotesData = async () => {
  try {
    const response = await fetch(QUOTES_API_URL);
    if (!response.ok) {
      throw new Error('Network response is not ok');
    }

    const result = await response.json();
    return result;
  } catch(error) {
    console.error(error);
  }
}