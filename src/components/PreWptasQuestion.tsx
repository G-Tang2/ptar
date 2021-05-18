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

    // picture card questions will be merged together
    const questionNo = props.number < 10 ? props.number : "10-12"
    const questionText = props.number < 10 ? props.question : "Pictures"

    return (<div className="question-container">
        <div className="question-top-container">
            <div className="question-text-ans-container">
                <h2 className="question">{questionNo}. {processQuestion(questionText)}</h2>
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