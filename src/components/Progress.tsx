import React, {useState} from "react";
import WptasProgressChart from "./ProgressChart"
import ProgressChart from "./ProgressChart"


function Progress(props) {
    return (
        <div>
            <h1>Progress</h1>
            <div className="chart-container">
                <div className="chart-wrapper">
                    <ProgressChart patientId={props.patientId}/>
                </div>
            </div>
        </div>
    )

}

export default Progress;


