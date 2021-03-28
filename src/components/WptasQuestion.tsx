import React, { Dispatch, SetStateAction } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

type WptasProps = {
    number:number, 
    question:string, 
    parentAnswer: {answered: boolean, mcGiven: boolean, score: string}, 
    setAnswer: Dispatch<SetStateAction<{ answered: boolean, mcGiven: boolean, score: string}>>
};

function Wptas_question(props:WptasProps) {
    const triggerAnswered = (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
        switch (option) {
            case "checkedAns":
                return (
                    props.setAnswer(
                        {answered: !props.parentAnswer.answered, mcGiven: props.parentAnswer.mcGiven, score: props.parentAnswer.score})
                )
            case "checkedMC":
                return (
                    props.setAnswer(
                        {answered: props.parentAnswer.answered, mcGiven: !props.parentAnswer.mcGiven, score: props.parentAnswer.score})
                )
            case "radio":
                return (
                    props.setAnswer(
                        {answered: props.parentAnswer.answered, mcGiven: props.parentAnswer.mcGiven, score: e.target.value === "0" ? "0" : "1"})
                )
        }        
    }

    const checkboxWithLabel = (checkboxName:string, labelText:string, checked: boolean, disabled: boolean) => 
        <FormControlLabel 
        className="question-option"
        control={
            <Checkbox name={checkboxName} checked={checked} disabled={disabled} onChange={(e) => triggerAnswered(e, checkboxName)}/>
        }
        label={labelText}
        />

    const radioWithLabel = () =>
        <RadioGroup className="question-option" row name="score-radios" onChange={(e) => triggerAnswered(e, "radio")}>
            <FormControlLabel
                className="radio-question"
                value="0"
                control={<Radio checked={props.parentAnswer.score === "0"}/>} 
                label="0"
                labelPlacement="bottom"
            />
            <FormControlLabel 
                className="radio-question"
                value="1"
                control={<Radio checked={props.parentAnswer.score === "1"}/>} 
                label="1"
                labelPlacement="bottom"
            />
        </RadioGroup>

    const disabledMC = () => props.parentAnswer.answered ? false : true;

    return (<div className="question-container">
        <h2>{props.number}. {props.question}</h2>
        <div className="option-container">
            {checkboxWithLabel("checkedAns", "Answered", props.parentAnswer.answered, false)}
            {checkboxWithLabel("checkedMC", "Multiple choice given", props.parentAnswer.mcGiven, disabledMC())}
            {radioWithLabel()}
        </div>
    </div>)
}

export default Wptas_question;