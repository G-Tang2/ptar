import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type WptasProps = {number:number, question:string};

function Wptas_question(props:WptasProps) {
    const checkboxWithLabel = (checkboxName:string, labelText:string) => 
        <FormControlLabel 
        className="question-option"
        control={
            <Checkbox name={checkboxName}/>
        }
        label={labelText}
        />

    const radioWithLabel = () =>
        <RadioGroup className="question-option" row name="score-radios">
            <FormControlLabel
                className="radio-question"
                value="0"
                control={<Radio/>} 
                label="0"
                labelPlacement="bottom"
            />
            <FormControlLabel 
                className="radio-question"
                value="1"
                control={<Radio/>} 
                label="1"
                labelPlacement="bottom"
            />
        </RadioGroup>

    return (<div className="question-container">
        <h2>{props.number}. {props.question}</h2>
        <div className="option-container">
            {checkboxWithLabel("checkedAns", "Answered")}
            {checkboxWithLabel("checkedMC", "Multiple choice given")}
            {radioWithLabel()}
        </div>
    </div>)
}

export default Wptas_question;