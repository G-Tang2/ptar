import React from "react";
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Edit } from "@material-ui/icons";


function AvailableTest(props) {
    return (<div>
        <h1>Tests</h1>
        <Grid container spacing={1}>
        <Grid item xs={12}>
            <Paper className='available-test' style={{padding: "10px 5px"}} elevation={3}>
                <div className='available-test-name'>
                    Westmead PTA (WPTAS)
                    <Link to={`/pre/wptas/${props.patientId}`} className='button-link available-test-pre-wptas'>
                        <Button className='available-test-button' variant="outlined" color="secondary" size="small" startIcon={<Edit/>} >Answers</Button>
                    </Link>
                </div>
                
                <Link to={`/test/wptas/${props.patientId}`} className='button-link'>
                    <Button className='available-test-button' variant="outlined" color="primary">Start</Button>
                </Link>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper className='available-test' style={{padding: "10px 5px"}} elevation={3}>
                <div className='available-test-name'>Agitated Behaviour Scale (ABS)</div>
                <Link to={`/test/abs/${props.patientId}`} className='button-link'>
                    <Button className='available-test-button' variant="outlined" color="primary">Start</Button>
                </Link>
            </Paper>
        </Grid>
        </Grid>
    </div>)
}

export default AvailableTest;