import React, {useState} from "react";
import AvailableTest from './AvailableTest';
import Progress from "./Progress";
import PastTest from "./PastTest";

function MainPage(props) {
    return (<div className='main-container'>
        <AvailableTest patientId={props.patientId}/>
        <Progress patientId={props.patientId}/>
        <PastTest patientId={props.patientId}/>
    </div>)
}

export default MainPage;