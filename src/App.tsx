import React, {useEffect, useState} from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import Header from "./components/Header";
import PreWptas from "./components/PreWptas";
import Abs from "./components/Abs";
import Wptas from "./components/Wptas";
import MainPage from "./components/MainPage";
import Qr from "./components/Qr";
import './stylesheets/main.scss';

function App() {
  const [patientId, setPatientId] = useState("")
  return (
    <div className="App">
      <Router >
        <Header patientId={patientId}/>
        <Route exact path="/">
          <Qr patientId={patientId} setPatientId={setPatientId}/>
        </Route>
        <Route path={`/home/${patientId}`}>
          <MainPage patientId={patientId}/>
        </Route>
        <Route path={`/pre/wptas/${patientId}`}>
          <PreWptas patientId={patientId}/>
        </Route>
        <Route path={`/test/wptas/${patientId}`}>
          <Wptas patientId={patientId}/>
        </Route>
        <Route path={`/test/abs/${patientId}`}>
          <Abs patientId={patientId}/>
        </Route>
      </Router>
    </div>
  );
}

export default App;