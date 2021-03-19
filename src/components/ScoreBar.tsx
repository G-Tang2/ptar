import React from "react";

function ScoreBar(props:any) {
    return (
    <div>
        <span>Total Score</span>
        <span>{props.score()}</span>
    </div>
    )
}

export default ScoreBar;