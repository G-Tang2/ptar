import React from 'react';
import logo from './logo.svg';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import './stylesheets/main.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <MainPage />
    </div>
  );
}

export default App;