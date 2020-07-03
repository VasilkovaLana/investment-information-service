import React from 'react';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { TopBar } from './components/topBar';
import { CurrentQuotesProvider } from './contexts/currentQuotes';

function App() {
  return (
    <div className="App">
      <CurrentQuotesProvider>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentQuotesProvider>
    </div>
  );
}

export default App;
