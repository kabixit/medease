import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { FamilyProvider } from './FamilyStateContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FamilyProvider>
      <App />
    </FamilyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
