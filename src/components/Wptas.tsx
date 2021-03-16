import React from "react";
import Wptas_question from "./WptasQuestion";
import DotStepper from "./navComponents/DotStepper";

// import dummy data
import Questions from "../dummyData/wptasQuestions";

function Wptas() {
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = 3;
    const firstPageQuestionAmount = 9;
    const firstPageQuestions = Questions.slice(0,firstPageQuestionAmount);
    const thirdPageQuestions = Questions.slice(firstPageQuestionAmount, Questions.length);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderPage = () => {
        console.log(activeStep);
        switch (activeStep) {
            case 0:
                return (
                    firstPageQuestions.map((question:string, index:number) => (
                        <Wptas_question number={index+1} question={question} />
                    ))
                )
            case 1:
                return (
                    <h1>Photo questions</h1>
                )
            case 2:
                return (
                    thirdPageQuestions.map((question:string, index:number) => (
                        <Wptas_question number={firstPageQuestionAmount+index+1} question={question} />
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