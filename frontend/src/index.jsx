import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';

const run = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const app = await init(socket);
  root.render(<React.StrictMode>{app}</React.StrictMode>);
};

run();
