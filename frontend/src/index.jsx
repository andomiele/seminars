import React from 'react';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const run = async () => {
  const root = ReactDOM.createRoot(document.getElementById('seminars'));
  const app = await init();
  root.render(<React.StrictMode>{app}</React.StrictMode>);
};

run();
