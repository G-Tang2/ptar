import React, { useEffect, useState } from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from "moment";

interface PastTestStruc {
    test_id:string,
    test_date_time:string, 
    clinician_initials:string, 
    test_score:number,
    test_type:string
}

type pastTestType = {
    test_id:string,
    test_date_time:string, 
    clinician_initials:string, 
    test_score:number,
    test_type:string
}

function PastTest(props) {
    const MAX_WPTAS_SCORE = 12
    const MAX_ABS_SCORE = 56
    const [results, setResults] = useState<PastTestStruc[]>([]);

    // get all patient's past test results
    const getPastTestsDetails = async () => {
        const pastTests:pastTestType[] = []
        await fetch(`http://localhost:5000/test/${props.patientId}`)
        .then(async res => await res.json())
        .then(res => {
            // load answers and store them in an array
            for (let i = 0; i < res.length; i++) {
                pastTests.push(res[i])
            }
            setResults(pastTests)
        })
    }

    useEffect(() => {
        getPastTestsDetails()
    }, []);

    const testResults = (testType:string) => {
        const targetTests = results.filter(test => test.test_type === testType);
        return (
            <React.Fragment>
                <TableContainer >
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell width="10%">
                                    <h3>Date</h3>
                                </TableCell>
                                <TableCell>
                                    <h3>Examiner</h3>
                                </TableCell>
                                <TableCell align="right" width="10%">
                                    <h3>Score</h3>
                                </TableCell>
                                <TableCell width="10%">
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {targetTests.map((test, index) =>
                            <TableRow key={index}>
                                <TableCell>
                                    <div>
                                        {moment(test.test_date_time).local().format("DD/MM/YYYY")}
                                    </div>
                                    <div>
                                        {moment(test.test_date_time).local().format("hh:mm a")}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {test.clinician_initials}
                                </TableCell>
                                <TableCell align="right">
                                    {test.test_score}/{testType==="wptas"?MAX_WPTAS_SCORE:MAX_ABS_SCORE}
                                </TableCell>
                                <TableCell>
                                    <Button>View</Button>
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        );
    }

    return (
        <div>
            <h1>Past Tests</h1>
            <Accordion elevation={3}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <h3 className="past-title-subtitle">
                    Westmead PTA (WPTAS)
                </h3>
            </AccordionSummary>
            <AccordionDetails className="past-test-container">
                {testResults("wptas")}
            </AccordionDetails>
            </Accordion>
            <Accordion elevation={3}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <h3 className="past-title-subtitle">
                    Agitated Behaviour Scale (ABS)
                </h3>
            </AccordionSummary>
            <AccordionDetails className="past-test-container">
                {testResults("abs")}
            </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default PastTest;