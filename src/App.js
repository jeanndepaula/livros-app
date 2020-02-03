import React from 'react';
import Routes from './routes';

import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

import Header from './components/Header';

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default App;
