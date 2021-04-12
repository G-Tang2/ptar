import React from 'react';
import logo from './logo.svg';
import Header from "./components/Header";
import Abs from "./components/Abs";
import MainPage from "./components/MainPage";
import './stylesheets/main.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Abs />
    </div>
  );
}

export default App;