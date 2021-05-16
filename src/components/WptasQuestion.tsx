import React, { Dispatch, SetStateAction } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import { Button, Dialog, DialogTitle, FormControl, List, ListItem } from "@material-ui/core";
import MultipleChoice from "./MultipleChoice";
import { useEffect } from "react";
import { useState } from "react";

type WptasProps = {
    number:number, 
    question:string, 
    correctAnswer:string,
    parentAnswer: {answered: boolean, mcGiven: boolean, correct: boolean, note:string}, 
    setAnswer: Dispatch<SetStateAction<{ answered: boolean, mcGiven: boolean, correct: boolean, note: string}>>
};

function SimpleDialog(props) {
    const handleClick = choice => {
        if (choice) {
            props.handleClose(choice)
        }
    }
  
    return (
      <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
        <DialogTitle id="simple-dialog-title">Multiple Choice</DialogTitle>
            <List>
                {props.choices.map(choice => (
                    <ListItem button key={choice} onClick={() => handleClick(choice)}>
                        {choice}
                    </ListItem>
                ))}
            </List>
      </Dialog>
    );
  }

  function PictureDialog(props) {
      const handleClick = () => {
          props.handleClose();
      }
    return (
      <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
        <DialogTitle id="simple-dialog-title">Picture</DialogTitle>
            <img className='no-highlight' id = {props.answer} src={props.answer} alt = {props.answer} height = {200} width = {200}/>
            <Button onClick={() => handleClick()}>OK</Button>
      </Dialog>
    );
  }

function Wptas_question(props:WptasProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [openPic, setOpenPic] = React.useState<boolean>(false);
    const [selectedValue, setSelectedValue] = React.useState<string>("");
    const [choices, setChoices] = useState<string[]>([])

    useEffect(() => {
        if (props.correctAnswer !== "") {
            const choices = MultipleChoice(props.number, props.correctAnswer)
            setChoices(choices)
        }
    },[props.correctAnswer, props.number])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenPic = () => {
        setOpenPic(true);
    };

    const handleClosePic = () => {
        setOpenPic(false);
    }

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
        props.setAnswer(prevState => ({...prevState, note: value}));
        // TODO: for late to automatically select correct or incorrect button
        // if (selectedValue === props.correctAnswer) {
        //     props.setAnswer(prevState => ({...prevState, answered: true, correct:true}));
        // }
        // else {
        //     props.setAnswer(prevState => ({...prevState, answered: true, correct:false}));
        // }
    };

    const handleAnswerBtnClick = (e) => {
        if (e.target.defaultValue === "correct") {
            props.setAnswer(prevState => ({...prevState, answered: true, correct:true}));
        }
        else if (e.target.defaultValue === "incorrect") {
            props.setAnswer(prevState => ({...prevState, answered: true, correct:false}));
        }
    }

    const handleTextChange = (e) => {
        props.setAnswer(prevState => ({...prevState, note: e.target.value}))
    }


    const RadioButton = () => {
        return (
            <div className="radio-selection-container">
                <FormControl component="fieldset" className="form-container">
                    <RadioGroup className="form-radio-group">
                        <FormControlLabel value="correct" className={props.parentAnswer.answered && props.parentAnswer.correct ? "correct-wrapper-active" : "correct-wrapper"} control={<Radio color="primary"/>} label="Correct" 
                            onChange={handleAnswerBtnClick} />
                        <FormControlLabel value="incorrect" className={props.parentAnswer.answered && !props.parentAnswer.correct ? "incorrect-wrapper-active" : "incorrect-wrapper"} control={<Radio color="primary"/>} label="Incorrect" 
                            onChange={handleAnswerBtnClick}/>
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

    const answerUI = () => {
        if (props.number === 8 || props.number > 9) {
            return(
                <React.Fragment>
                    <Button variant="contained" color="primary" onClick={handleClickOpenPic} style={{opacity:"100%"}}>
                        Show
                    </Button>
                    <PictureDialog 
                        open={openPic} 
                        handleClose={handleClosePic} 
                        answer={props.correctAnswer}
                    />
                </React.Fragment>
            )
        }
        else {
            return props.correctAnswer
        }
    }

    return (<div className="question-container">
        <div className="question-top-container">
            <div className="question-text-ans-container">
                <h2 className="question">{props.number}. {props.question}</h2>
                <p className="answer-text">Answer: {answerUI()}</p>
            </div>
            <div className="button-wrapper">
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Show Choices
                </Button>
                <SimpleDialog 
                    choices={choices}
                    open={open} 
                    handleClose={handleClose} 
                />
            </div>
        </div>
        <div className="option-container">
            {RadioButton()}
            <div className="answer-text-field">
                <TextField label="Note" onChange = {handleTextChange} value={props.parentAnswer.note} variant="outlined" fullWidth size="small"/>
            </div>
        </div>
    </div>)
}

export default Wptas_question;