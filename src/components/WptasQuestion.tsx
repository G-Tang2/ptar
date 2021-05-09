import React, { Dispatch, SetStateAction } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import { Button, FormControl } from "@material-ui/core";

type WptasProps = {
    number:number, 
    question:string, 
    correctAnswer:string,
    parentAnswer: {answered: boolean, mcGiven: boolean, correct: boolean, note:string}, 
    setAnswer: Dispatch<SetStateAction<{ answered: boolean, mcGiven: boolean, correct: boolean, note: string}>>
};

function Wptas_question(props:WptasProps) {
    const handleAnswerBtnClick = (e) => {
        if (e.target.defaultValue === "correct") {
            props.setAnswer(prevState => ({...prevState, answered: true, correct:true}));
        }
        else if (e.target.defaultValue === "incorrect") {
            props.setAnswer(prevState => ({...prevState, answered: true, correct:false, note: props.parentAnswer.note}));
        }
    }

    const handleTextChange = (e) => {
        props.setAnswer(prevState => ({...prevState, note: e.target.value}))
    }

    const RadioButton = () => {
        return (
            <div className="radio-selection-container">
                <FormControl component="fieldset" className="form-container">
                    <RadioGroup className="form-radio-group">
                        <FormControlLabel value="correct" className={props.parentAnswer.answered && props.parentAnswer.correct ? "correct-wrapper-active" : "correct-wrapper"} control={<Radio color="primary"/>} label="Correct" 
                            onChange={handleAnswerBtnClick} />
                        <FormControlLabel value="incorrect" className={props.parentAnswer.answered && !props.parentAnswer.correct ? "incorrect-wrapper-active" : "incorrect-wrapper"} control={<Radio color="primary"/>} label="Incorrect" 
                            onChange={handleAnswerBtnClick}/>
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

    return (<div className="question-container">
        <div className="question-top-container">
            <div className="question-text-ans-container">
                <h2 className="question">{props.number}. {props.question}</h2>
                <p className="answer-text">Answer: {props.correctAnswer}</p>
            </div>
            <div className="button-wrapper">
                {/*TODO: Link multiple choice button to multiple choice pop up and keep track of answers*/}
                <Button variant="contained" color="primary">
                    Show Choices
                </Button>
            </div>
        </div>
        <div className="option-container">
            {RadioButton()}
            <div className="answer-text-field">
                <TextField label="Note" onChange = {handleTextChange} variant="outlined" fullWidth size="small"/>
            </div>
        </div>
    </div>)
}

export default Wptas_question;