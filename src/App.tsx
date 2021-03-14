import React from 'react';
import logo from './logo.svg';
import Header from "./components/Header";
import Wptas from "./components/Wptas";
import './stylesheets/main.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Wptas />
    </div>
  );
}

export default App;
