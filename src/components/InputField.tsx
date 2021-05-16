import 'date-fns';
import TextField from "@material-ui/core/TextField";
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import { useEffect, useState } from 'react';
import { storage } from "../firebase/index";
import React from 'react';


function InputField(props) {
    const storageRef = storage.ref();
    const [url, setUrl] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);
    const [choice, setChoice] = useState<string[]>(["","",""]);

    useEffect(() => {
        if (props.number === 10) {
            const subDirectory = props.number === 8 ? "faces" : "picture-cards"
            const fetchImages = async () => {
            let result = await storageRef.child("images").child(subDirectory).listAll();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
            return Promise.all(urlPromises);
        }
            
            const loadImages = async () => {
                const urls:string[] = await fetchImages();
                setUrl(urls);
            }
            loadImages()

            setChoice(props.answer)

            let count = 0;
            for (let i=0; i < props.answer.length;i++) {
                console.log(props.answer[i])
                if (props.answer[i] !== ""){
                    count++;
                }
            }
            setCount(count)
        }
    }, [props]);

    const handleChange = (e) => {
        props.setAnswer(e.target.value as string)
    }

    const handleDateChange = (date: Date | null) => {
        props.setAnswer(date);
      };

      const ageForm = () => {
          const MINIMUM_AGE = 5
          const MAXIMUM_AGE = 99
        return(
            <FormControl style={{minWidth: "100px"}}>
                <InputLabel>Age</InputLabel>
                <Select
                value={props.answer || ""}
                onChange={handleChange}
                >
                {Array.from(new Array(MAXIMUM_AGE-MINIMUM_AGE+1), (_,i) => i + MINIMUM_AGE).map(val => <MenuItem value={val}>{val}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }

    const dobForm = () => {
        return(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                margin="normal"
                label="D.O.B"
                format="dd/MM/yyyy"
                value={props.answer}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
            </MuiPickersUtilsProvider>
        )
    }

    const monthsForm = () => {
        return(
            <FormControl style={{minWidth: "100px"}}>
                <InputLabel>Month</InputLabel>
                <Select
                value={props.answer || ""}
                onChange={handleChange}
                >
                {moment.months().map(month => <MenuItem value={month}>{month}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }

    const timeOfDayForm = () => {
        const TIME_OF_DAY_ARR = ["Morning", "Afternoon", "Night"]
        return(
            <FormControl style={{minWidth: "100px"}}>
                <InputLabel>Time of day</InputLabel>
                <Select
                value={props.answer || ""}
                onChange={handleChange}
                >
                {TIME_OF_DAY_ARR.map(timeOfDay => <MenuItem value={timeOfDay}>{timeOfDay}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }

    const dayForm = () => {
        return(
            <FormControl style={{minWidth: "100px"}}>
                <InputLabel >Day</InputLabel>
                <Select
                value={props.answer || ""}
                onChange={handleChange}
                >
                {moment.weekdays().map(day => <MenuItem value={day}>{day}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }

    const yearForm = () => {
        return(
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker style={{width:"100px"}}
                margin="normal"
                label="Year"
                views={["year"]}
                value={props.answer}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
            </MuiPickersUtilsProvider>
        )
    }

    const pictureForm = () => {
        const highlightImage = (e: any) => {
            console.log(count)
            console.log(choice)
            var images = document.getElementById(e.target.id);
            if (images != null) {
                if (images.className === "highlight") {
                    images.className = "no-highlight"
                    setCount(count - 1);;
                    for (let i = 0; i < 3; i++) {
                        if (choice[i] == e.target.id) {
                            choice[i] = '';
                            setChoice(choice)
                            props.setAnswer(choice)
                            break;
                        }
                    }
                }
                else {
                    if (count >= 3) {
                        console.log('Cannot select more than 3 images.')
                        return;
                    }
                    setCount(count + 1);;
                    images.className = "highlight";
                    for (let i = 0; i < 3; i++) {
                        if (choice[i] === '') {
                            choice[i] = e.target.id;
                            setChoice(choice)
                            props.setAnswer(choice)
                            break;
                        }
                    }
                }
            }

        }
        return (
            <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >Select three pictures</AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={1} justify="center" className = "pics">
                            {url.map(url => (
                                <Grid item xs={4}>
                                    <img className={props.answer.includes(url) ? 'highlight' : 'no-highlight'} id = {url} src={url} alt = {url} height = {200} width = {150} onClick={highlightImage}/>
                                </Grid>
                                )
                            )}
                        </Grid>
                    </AccordionDetails>
            </Accordion>
        )}
            

    const questionInputField = question_no => {
        switch (question_no) {
            case (1):
                return ageForm()
            case (2):
                return dobForm()
            case (3):
                return monthsForm()
            case (4):
                return timeOfDayForm()
            case (5):
                return dayForm()
            case (6):
                return yearForm()
            case (10):
                return pictureForm()
            default:
                return <TextField label="Correct Answer" onChange = {handleChange} variant="outlined" fullWidth size="small" value={props.answer ||""}/>
        }
    }

    return (questionInputField(props.number))
}

export default InputField;