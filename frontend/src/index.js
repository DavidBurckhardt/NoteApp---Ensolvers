// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter'; // Importa AppRouter

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
