import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Header from "./components/Header";
import Abs from "./components/Abs";
import MainPage from "./components/MainPage";
import './stylesheets/main.scss';

function App() {
  const [questions, setQuestions] = useState([]);
  const getQuestions = () => fetch("/questions/abs").then((res) => res.json()).then((res) => setQuestions(res))
  
  useEffect(() => {
    getQuestions()
  })

  console.log(questions);

  return (
    <div className="App">
      <Header />
      <Abs />
    </div>
  );
}

export default App;