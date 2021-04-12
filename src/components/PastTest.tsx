import React from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

type ResultsProps = {
    wptasResults: Array<{date:string, examiner:string, score:number}>
    absResults: Array<{date:string, examiner:string, score:number}>
};

function PastTest(props:ResultsProps) {

    const testResults = (results: Array<{date:string, examiner:string, score:number}>) => {
        const mapTests = results.map((result) =>
                <Grid container >
                    <Grid item xs={2}>
                        {result.date}
                    </Grid>
                    <Grid item xs>
                        {result.examiner}
                    </Grid>
                    <Grid item xs={1}>
                        {result.score}
                    </Grid>
                    <Grid item xs={1}>
                        <Button>View</Button>
                    </Grid>
                </Grid>
        ) 

        return (
            <React.Fragment>
                <Grid container >
                    <Grid item xs={2}>
                        Date
                    </Grid>
                    <Grid item xs>
                        Examiner
                    </Grid>
                    <Grid item xs={1}>
                        Score
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
                {mapTests}
            </React.Fragment>
        )
    }

    return (
        <div>
            <h1>Past Tests</h1>
            <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                Westmead PTA (WPTAS)
            </AccordionSummary>
            <AccordionDetails className="past-test-container">
                {testResults(props.wptasResults)}
            </AccordionDetails>
            </Accordion>
            <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                Agitated Behaviour Scale (ABS)
            </AccordionSummary>
            <AccordionDetails className="past-test-container">
                {testResults(props.absResults)}
            </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default PastTest;