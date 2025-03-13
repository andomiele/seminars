import React from 'react';
import Seminars from './components/Main';
import Header from './components/Header';
import BaseModal from './components/Modal';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <Seminars />
    <BaseModal />
  </div>
);

export default App;
