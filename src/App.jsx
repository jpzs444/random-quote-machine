import { QuoteBox } from './components';
import { Provider } from 'react-redux';
import { store } from './stores/store';

const App = () => {
  return (
    <div className='app-div container d-flex align-items-center'>
      <Provider store={store}>
        <QuoteBox /> 
      </Provider>
    </div>
  )
}

export default App