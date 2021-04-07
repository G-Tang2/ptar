import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const getQuestions = () => fetch("/questions/abs").then((res) => res.json()).then((res) => setQuestions(res))
  
  useEffect(() => {
    getQuestions()
  })

  console.log(questions);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;