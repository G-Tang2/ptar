import React, { Dispatch, SetStateAction } from "react";
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import QuestionInputField from "./InputField"


function PreWptasQuestion(props) {
    // temporary method to change patient directed questions to clinician directed questions
    const processQuestion = (question) => {
        switch(question) {
            case "How old are you?": {
                return "How old is the patient?"
            }
            case "What is your date of birth?": {
                return "What is the patient's date of birth?"
            }
            default: {
                return question
            }
        }
    }

    return (<div className="question-container">
        <div className="question-top-container">
            <div className="question-text-ans-container">
                <h2 className="question">{props.number}. {processQuestion(props.question)}</h2>
            </div>
        </div>
        <div className="option-container">
            <div className="answer-text-field">
                <QuestionInputField number={props.number} answer={props.answer} setAnswer={props.setAnswer}/>
            </div>
        </div>
    </div>)
}

export default PreWptasQuestion;