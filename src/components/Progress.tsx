import React, {useState} from "react";

type ResultsProps = {
    results: Array<{date:string, examiner:string, score:number}>
};

function Progress(props:ResultsProps) {
    return (
        <div>
            <h1>Progress</h1>
            {props.results.length > 1 ? <div>SHOW GRAPHS</div> : <div>Not enough data (greyed out text)</div>}
        </div>
    )

}

export default Progress;


