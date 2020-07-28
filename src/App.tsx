import React from 'react';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { TopBar } from './components/topBar/topBar';
// import { CurrentQuotesProvider } from './contexts/currentQuotes';
import { CurrentQuotesProvider } from './contexts/currentQuotes';

import styled from 'styled-components';

const Container = styled.div`
  max-width: 1250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <div className="App">
      {/* <CurrentQuotesProvider> */}
      <Router>
        <Container>
          <TopBar />
          <Routes />
        </Container>
      </Router>
      {/* </CurrentQuotesProvider> */}
    </div>
  );
}

export default App;
