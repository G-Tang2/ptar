function ScoreBar(props:any) {
    return (
    <div className="total-score-container">
        <span>Total Score </span>
        <span className="total-score-number">{props.score()}</span>
    </div>
    )
}

export default ScoreBar;