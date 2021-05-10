import React, {useState} from "react";
import {Button} from "@material-ui/core";
import Wptas from "./Wptas"
import PreWptasQuestion from "./PreWptasQuestion";
import {Link, Route} from "react-router-dom";


import { useEffect } from "react";
import moment from "moment";

function PreWptas(props) {
    // WPTAS questions that will be loaded from the database
    const [questions, setQuestions] = useState([])

    const [answerOne, setAnswerOne] = useState<string|null>(null)
    const [answerTwo, setAnswerTwo] = useState<string|null>(null)
    const [answerThree, setAnswerThree] = useState<string|null>(null)
    const [answerFour, setAnswerFour] = useState<string|null>(null)
    const [answerFive, setAnswerFive] = useState<string|null>(null)
    const [answerSix, setAnswerSix] = useState<string|null>(null)
    const [answerSeven, setAnswerSeven] = useState<string|null>(null)
    const [answerEight, setAnswerEight] = useState<string|null>(null)
    const [answerNine, setAnswerNine] = useState<string|null>(null)
    const [answerTen, setAnswerTen] = useState<string|null>(null)
    const [answerEleven, setAnswerEleven] = useState<string|null>(null)
    const [answerTwelve, setAnswerTwelve] = useState<string|null>(null)

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

    const getQuestions = () => fetch("http://localhost:5000/questions/wptas").then(res => res.json()).then(res => setQuestions(res));

    const getAnswers = () => {
        let index;
        let val;
        fetch(`http://localhost:5000/pre-wptas/api/${props.patientId}`)
        .then(res => res.json())
        .then(res => {
            // load latest answers to pre-load page
            for (let i = 0; i < res.length; i++) {
                index = res[i].wptas_question_no - 1
                val = res[i].wptas_ref_ans_info
                setAnswerArr[index](val)
            }
        })
    }

    useEffect(() => {
        getQuestions()
        getAnswers()
    }, []);

    const onSubmit = e => {
        const utcDate = moment().utc().format()
        const localDate = moment.utc(utcDate).local().format()
        for (let i = 0; i < answerArr.length; i++) {
            try{
                const body = {question_no:i+1, patient_id: props.patientId, date:localDate, info:answerArr[i]}
                const response = fetch(`http://localhost:5000/pre-wptas/api/${props.patientId}`,{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                })
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    const isCompleted = () => !answerArr.includes(null) && !answerArr.includes("")
    
    return (
        <div>
            <div className="sticky-notification">
                <p>This is <b>NOT</b> the Westmead P.T.A (WPTAS) test</p>
            </div>
            <div className="main-container">
                <h1 className="form-title">PRE-REQUIREMENT</h1>
                <h3 className="form-subtitle"> WESTMEAD P.T.A SCALE</h3>
                    <p className="form-description">Please fill in the correct answers for the test that will be conducted.</p>
                <div className="questions">
                    {questions.map((question:{wptas_question_no:number, wptas_question_desc:string}) => (
                        <PreWptasQuestion 
                            number={question.wptas_question_no} 
                            question={question.wptas_question_desc} 
                            answer={answerArr[question.wptas_question_no-1]}
                            setAnswer={setAnswerArr[question.wptas_question_no-1]}/>
                        )
                    )}
                </div>        
                <div className="button-wrapper" >
                    {isCompleted() ? 
                        <Link to={`/home/${props.patientId}`} className='button-link' onClick={onSubmit}>
                            <Button className='submit-button' variant="contained" color="primary">Submit</Button>
                        </Link> :
                        <Button variant="contained" color="primary" className="submit-button" disabled>Submit</Button>}
                </div>
            </div>
        </div>
    )
}

export default PreWptas;