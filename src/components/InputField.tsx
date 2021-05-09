import 'date-fns';
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import { useEffect } from 'react';


function InputField(props) {
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
            default:
                return <TextField label="Correct Answer" onChange = {handleChange} variant="outlined" fullWidth size="small" value={props.answer ||""}/>
        }
    }

    return (questionInputField(props.number))
}

export default InputField;