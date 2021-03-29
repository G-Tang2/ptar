import React from 'react';
import logo from './logo.svg';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Qr from "./components/Qr";
import WptasPicture from "./components/WptasPicture";
import './stylesheets/main.scss';
import pic1 from './components/assets/bird1.jpg';
function App() {
  return (
    <div className="App">
      <Header />
      <WptasPicture />
    </div>
  );
}

export default App;