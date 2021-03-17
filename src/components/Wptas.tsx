import React, {useState} from "react";
import Wptas_question from "./WptasQuestion";
import DotStepper from "./navComponents/DotStepper";

// import dummy data
import Questions from "../dummyData/wptasQuestions";

function Wptas() {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = 3;
    const firstPageQuestionAmount = 9;
    const firstPageQuestions = Questions.slice(0,firstPageQuestionAmount);
    const thirdPageQuestions = Questions.slice(firstPageQuestionAmount, Questions.length);

    // Could find a way to handle the initial score value better
    const [answerOne, setAnswerOne] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerTwo, setAnswerTwo] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerThree, setAnswerThree] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerFour, setAnswerFour] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerFive, setAnswerFive] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerSix, setAnswerSix] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerSeven, setAnswerSeven] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerEight, setAnswerEight] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerNine, setAnswerNine] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerTen, setAnswerTen] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerEleven, setAnswerEleven] = useState({answered: false, mcGiven: false, score: "-1"})
    const [answerTwelve, setAnswerTwelve] = useState({answered: false, mcGiven: false, score: "-1"})

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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderPage = () => {
        switch (activeStep) {
            case 0:
                return (
                    firstPageQuestions.map((question:string, index:number) => (
                        <Wptas_question 
                            number={index+1} 
                            question={question} 
                            parentAnswer={answerArr[index]}
                            setAnswer={setAnswerArr[index]}/>
                    ))
                )
            case 1:
                return (
                    <h1>Photo questions</h1>
                )
            case 2:
                return (
                    thirdPageQuestions.map((question:string, index:number) => (
                        <Wptas_question 
                            number={firstPageQuestionAmount+index+1} 
                            question={question} 
                            parentAnswer={answerArr[firstPageQuestionAmount+index]}
                            setAnswer={setAnswerArr[firstPageQuestionAmount+index]}/>
                    ))
                )
        }
    }

    return (
    <div className="main-container">
        <h1>WESTMEAD P.T.A SCALE</h1>
        <a>P.T.A may be deemed to be over on the first of 3 consecutive days of a recall of 12.</a>
        {renderPage()}
        <DotStepper steps={maxSteps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack}/>
    </div>
    )
}

export default Wptas;