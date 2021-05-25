import React, {useEffect, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import AbsQuestion from "./AbsQuestion";
import moment from "moment";

function Abs(props) {
    const [results, setResults] = useState(new Array(14).fill(null))
    const [questions, setQuestions] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [clinicianId, setClinicianId] = useState("")
    
    const getQuestions = () => fetch("http://localhost:5000/questions/abs").then(res => res.json()).then(res => setQuestions(res));

    useEffect(() => {
        getQuestions()
    }, []);

    const handleChange = (e) => {
        setClinicianId(e.target.value)
    }

    const handleSubmit = async () => {
        setIsSubmitted(true)
        const utcDate = moment().utc().format()
        const localDate = moment.utc(utcDate).local().format()
        const curScore = calcScore();
        // store test details
        try{
            const body = {patient_id: props.patientId, test_date_time: localDate, clinician_initials:clinicianId, test_score: curScore, test_type: "abs"}
            const response = await fetch(`http://localhost:5000/abs/test/${props.patientId}`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            // store test answers
            await response.json().then(data => {
                for (let i=0; i<results.length; i++) {
                    try{
                        // data[0].test_id holds the test id due to RETURNING query
                        const body = {test_id: data[0].test_id, abs_question_no: i+1, abs_option: results[i]}
                        fetch(`http://localhost:5000/abs/test/results/${props.patientId}`,{
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(body)
                        })
                    } catch (err) {
                        console.log(err.message)
                    }
                }
            }
            )} catch (err) {
                console.log(err.message)
        }
    }

    const infoText = (
        <React.Fragment>
            <h1>AGITATED BEHAVIOUR SCALE</h1>
            <h2>Using information from the past 24 hours, score each item using the following criteria.</h2>
            <p>1 = absent: the behaviour is not present.</p>
            <p>2 = present to a slight degree: behaviour is present but does not prevent conduct of other, 
                contextually appropriate behaviour (The individual may redirect spontaneously, or the continuation 
                of the agitated behaviour does not distrupt appropriate behaviour).</p>
            <p>3 = present to a moderate degree: needs to be a redirected from an agitated to an appropriate 
                behaviour, but benefits from such cueing.</p>
            <p>4 = present to an extreme degree: not able to engage in appropriate behaviour due to the interference 
                of the agitated behaviour, even when external cueing or direction is provided.</p>
        </React.Fragment>
    )

    const result = (result:string, desc:string) => {
        return(<div className="result-container">
            <h1 className="result-main-text">{result}</h1>
            <div className="score-container">
                <h3>Score</h3>
                <h3>{calcScore()}</h3>
            </div>
            <p className="result-description">{desc}</p>
            <Link to={`/home/${props.patientId}`} className='button-link'>
                <Button variant="contained" color="primary">Done</Button>
            </Link>
        </div>)
    }

    const resultText = (score:number) => {
        if (score <= 21) {
            return result("Normal", "Score is ≤ 21. Within normal limits.")
        }
        else if (score <= 28) {
            return result("Mild", "Score is 22-28. Mild agitation.")
        }
        else if (score <= 35) {
            return result("Moderate", "Score is 29-35. Moderate agitation.")
        }
        else if (score > 35) {
            return result("Severe", "Score is ≥ 35. Severe agitation.")
        }
    }
    
    const calcScore = () => results.reduce((acc, cur) => cur === null ? acc : acc + cur, 0)

    const isCompleted = () => {
        for (let i = 0; i < results.length; i++) {
            if (results[i] === null) {
                return false;
            }
        }
        if (clinicianId.length === 0) {
            return false;
        }
        return true;
    }

    return (
        <div className = "main-container">
            {isSubmitted ?
                resultText(calcScore())
                :
                <React.Fragment>
                    <div>{infoText}</div>
                    <div className="questions">
                        {questions.map((question:{abs_question_no:number, abs_question_desc:string})=><AbsQuestion key={question.abs_question_no} number={question.abs_question_no} 
                                                                                                        question={question.abs_question_desc}
                                                                                                        results={results}
                                                                                                        setResults={setResults}
                                                                                                        /> )}
                    </div>
                    <TextField 
                    className="examiner-initials-text-field" 
                    label="Examiner initials" 
                    onChange = {handleChange} 
                    variant="outlined" 
                    fullWidth 
                    size="small" 
                    value={clinicianId}
                    inputProps={{ maxLength: 3 }}
                    />
                    <div className="button-wrapper" >
                    {isCompleted() ?
                    <Button variant="contained" color="primary" className="submit-button" onClick={handleSubmit}>Submit</Button>  :
                    <Button variant="contained" color="primary" className="submit-button" disabled>Submit</Button>}
                    </div>
                </React.Fragment>
            }
        </div>
    );
}

export default Abs;
