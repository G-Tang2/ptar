import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormControl } from "@material-ui/core";

type AbsProps = {
    number:number, 
    question:string,
    results:(number|null)[], 
    setResults: React.Dispatch<React.SetStateAction<any[]>>
};

function AbsQuestion(props:AbsProps) {
    const handleClick = (e) => {
        let newArray = [...props.results];
        newArray[props.number-1] = Number(e.target.defaultValue);
        props.setResults(newArray)
    }
    return (<div className="question-container">
                <div className="question-top-container">
                    <div className="question-text-ans-container">
                        <h2 className="question">{props.number}. {props.question}</h2>
                    </div>
                </div>
                <div className="radio-container">
                    <FormControl component="fieldset" className="radio-control" onChange={handleClick}>
                        <RadioGroup row className="radio-group">
                            <FormControlLabel className="radio-btn" value="1" control={<Radio color="primary"/>} label="1" />
                            <FormControlLabel className="radio-btn" value="2" control={<Radio color="primary"/>} label="2" />
                            <FormControlLabel className="radio-btn" value="3" control={<Radio color="primary"/>} label="3" />
                            <FormControlLabel className="radio-btn" value="4" control={<Radio color="primary"/>} label="4" />
                        </RadioGroup>
                    </FormControl>
                </div>

    </div>)
}

export default AbsQuestion;