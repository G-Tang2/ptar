import React, {useEffect, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import WptasQuestion from "./WptasQuestion";
import ScoreBar from "./ScoreBar";
import {Link} from "react-router-dom";
import { PinDropSharp, TextFormatRounded } from "@material-ui/icons";
import moment from "moment";

function Wptas(props) {
    // WPTAS questions that will be loaded from the database
    const [questions, setQuestions] = useState([])
    const getQuestions = () => fetch("http://localhost:5000/questions/wptas").then(res => res.json()).then(res => setQuestions(res));
    const [correctAnswers, setCorrectAnswers] = useState(new Array(14).fill(""))
    const [clinicianId, setClinicianId] = useState("")

    // load correct answers to generate MC and to inform user
    const getAnswers = () => {
        let index;
        let val;
        const newCorrectAnswers = [...correctAnswers]
        fetch(`http://localhost:5000/pre-wptas/api/${props.patientId}`)
        .then(res => res.json())
        .then(res => {
            // load answers and store them in an array
            for (let i = 0; i < res.length; i++) {
                index = res[i].wptas_question_no - 1
                val = res[i].wptas_ref_ans_info
                newCorrectAnswers[index] = val === "" ? "No answer set" : val
            }
            setCorrectAnswers(newCorrectAnswers)
        })
    }

    useEffect(() => {
        getQuestions()
        getAnswers()
    }, []);

    const [answerOne, setAnswerOne] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerTwo, setAnswerTwo] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerThree, setAnswerThree] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerFour, setAnswerFour] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerFive, setAnswerFive] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerSix, setAnswerSix] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerSeven, setAnswerSeven] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerEight, setAnswerEight] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerNine, setAnswerNine] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerTen, setAnswerTen] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerEleven, setAnswerEleven] = useState({answered: false, mcGiven: false, correct: false, note: ""})
    const [answerTwelve, setAnswerTwelve] = useState({answered: false, mcGiven: false, correct: false, note: ""})

    const answerArr = [
        answerOne, 
        answerTwo, 
        answerThree, 
        answerFour, 
        answerFive, 
        answerSix,
        answerSeven,
        answerEight,
        answerNine,
        answerTen,
        answerEleven,
        answerTwelve

    ]
    const setAnswerArr = [
        setAnswerOne, 
        setAnswerTwo, 
        setAnswerThree, 
        setAnswerFour, 
        setAnswerFive, 
        setAnswerSix,
        setAnswerSeven,
        setAnswerEight,
        setAnswerNine,
        setAnswerTen,
        setAnswerEleven,
        setAnswerTwelve
    ]

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handleChange = (e) => {
        setClinicianId(e.target.value)
    }

    const handleSubmit = async () => {
    const utcDate = moment().utc().format()
    const localDate = moment.utc(utcDate).local().format()
    const curScore = calcScore();
    // store test details
    try{
        const body = {patient_id: props.patientId, test_date_time: localDate, clinician_initials:clinicianId, test_score: curScore, test_type: "wptas"}
        const response = await fetch(`http://localhost:5000/wptas/test/${props.patientId}`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        // store test answers
        await response.json().then(data => {
            for (let i=0; i<answerArr.length; i++) {
                try{
                    // data[0].test_id holds the test id due to RETURNING query
                    const body = {test_id: data[0].test_id, wptas_question_no: i+1, wptas_mc_given: answerArr[i].mcGiven,
                         wptas_correct: answerArr[i].correct, wptas_ans_note: answerArr[i].note}
                    const response = fetch(`http://localhost:5000/wptas/test/results/${props.patientId}`,{
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
      
    const calcScore:() => number = () => answerArr.filter(question => question.correct).reduce((acc, cur) => cur ? acc+1: acc, 0)

    const isCompleted:() => boolean = () => (answerArr.length === answerArr.reduce((acc, cur) => cur.answered ? acc+1 : acc, 0)) && (clinicianId.length > 0)

    return (
    <div className="main-container">
        <h1 className="form-title">WESTMEAD P.T.A SCALE</h1>
        <p className="form-description">P.T.A may be deemed to be over on the first of 3 consecutive days of a recall of 12.</p>
        <div className="questions">
            {questions.map((question:{wptas_question_no:number, wptas_question_desc:string}) => (
                <WptasQuestion 
                    number={question.wptas_question_no} 
                    question={question.wptas_question_desc} 
                    correctAnswer={correctAnswers[question.wptas_question_no-1]}
                    parentAnswer={answerArr[question.wptas_question_no-1]}
                    setAnswer={setAnswerArr[question.wptas_question_no-1]}/>
                )
            )}
        </div>
        <ScoreBar score={calcScore}/>
        <TextField label="Examiner initials" onChange = {handleChange} variant="outlined" fullWidth size="small" value={clinicianId}/>
        <div className="button-wrapper" >
                {isCompleted() ? 
                    <Link to={`/home/${props.patientId}`} className="button-link" onClick={handleSubmit}>
                        <Button variant="contained" color="primary" className="submit-button">Submit</Button> 
                    </Link> :
                    <Button variant="contained" color="primary" className="submit-button" disabled>Submit</Button>}
        </div>
    </div>
    )
}

export default Wptas;