import React from "react";
import Wptas_question from "./WptasQuestion";

// import dummy data
import Questions from "../dummyData/wptasQuestions";

function Wptas() {
    return (<div className="main-container">
        <h1>WESTMEAD P.T.A SCALE</h1>
        <a>P.T.A may be deemed to be over on the first of 3 consecutive days of a recall of 12.</a>
        {Questions.map((question:string, index:number) => (
            <Wptas_question number={index+1} question={question} />
        ))}
    </div>)
}

export default Wptas;