import React from 'react';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from './stores';

const Root = () => (
  <Provider {...stores}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

export default Root;