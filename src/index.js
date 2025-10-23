import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { Provider } from './context/TodoContext';

const el = document.querySelector('#root');
const root = ReactDOM.createRoot(el);
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);


