import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    font-size: 16px;
    background: #183048;
    .box {
      padding: 48px 32px;
      background: #364f6b;
    }
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
