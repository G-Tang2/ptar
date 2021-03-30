import React from "react";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function UpcomingTest() {
    const tests = ['Westmead PTA (WPTAS)', 'Agitated Behaviour Scale (ABS)']
    const testComponent = (date:string, testName:string) => (
        <Grid item xs={12}>
            <Paper className='upcoming-test'>
                <div className='upcoming-test-date'>{date}</div>
                <div className='upcoming-test-name'>{testName}</div>
                <Button className='upcoming-test-button'>Start</Button>
            </Paper>
        </Grid>
    )

    return (<div className='upcoming-test-container'>
        <h1>Upcoming Tests</h1>
        <Grid container spacing={1}>
            {tests.map(test => testComponent('Date', test))}
        </Grid>
    </div>)
}

export default UpcomingTest;