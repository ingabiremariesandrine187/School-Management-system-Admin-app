import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './setupAxios'; // ensure this runs before other service calls
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
