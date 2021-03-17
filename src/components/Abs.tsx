import React from "react";
import * as Survey from "survey-react";
import "./Abs.css"
import "survey-react/survey.css";

class FormComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { isCompleted: false };
        this.onCompleteComponent = this.onCompleteComponent.bind(this);
    }
    onCompleteComponent() {
        this.setState({ isCompleted: true });
    }
    render() {
        let questionJson = {
            questions: [
                {
                    type: "radiogroup",
                    name: "q1",
                    title: "Short attention span, easy distractibility, inability to concentreate.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q2",
                    title: "Impulsive, impatient, low tolerance for pain or frustration.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q3",
                    title: "Uncooperative, resistant to care, demanding.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q4",
                    title: "Violent and/or threatening violence toward people or property.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q5",
                    title: "Explosive and/or unpredictable anger.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q6",
                    title: "Rocking, rubbing, moaning, or other self-stimulating behaviours.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q7",
                    title: "Pulling at tubes, restraints etc.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q8",
                    title: "Wandering from treatment areas.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q9",
                    title: "Restlessness, pacing, excessive movement.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q10",
                    title: "Repetitive behaviours, motor and/or verbal.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q11",
                    title: "Rapid, loud or excessive talking.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q12",
                    title: "Sudden changes in mood.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q13",
                    title: "Easily initiated or excessive crying and/or laughter.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                },
                {
                    type: "radiogroup",
                    name: "q14",
                    title: "Self-abusiveness, physical and/or verbal.",
                    isRequired: true,
                    colCount: 4,
                    choices: ["1", "2", "3", "4"]
                }
            ]
        };
        var surveyRender = !this.state.isCompleted ? (
            <Survey.Survey
            json={questionJson}
            showCompletedPage={false}
            onComplete={this.onCompleteComponent}
            />
        ) : null;
        var onCompleteComponent = this.state.isCompleted ? (
            <div>You have successfully complete the ABS form!</div>
        ) : null;

        return (
            <div>
                {surveyRender}
                {onCompleteComponent}
            </div>
        );
    }
}

function Abs() {
    return (
    <div className = "Abs">
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
        <FormComponent />
    </div>);
}

export default Abs;