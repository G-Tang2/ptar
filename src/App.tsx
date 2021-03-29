import React from 'react';
import logo from './logo.svg';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Qr from "./components/Qr";
import WptasPicture from "./components/WptasPicture";
import './stylesheets/main.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Qr />
      {/* <WptasPicture /> */}
    </div>
  );
}

export default App;