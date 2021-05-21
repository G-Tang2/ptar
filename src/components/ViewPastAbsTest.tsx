import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";

function ViewPastAbsTest(props) {
    const { testId } = props.match.params
    const [questions, setQuestions] = useState<{abs_question_no:number, abs_question_desc:string}[]>([])
    const [results, setResults] = useState<{abs_option:number}[]>([])
    const [completeFetch, setCompleteFetch] = useState(false)

    console.log(testId);
    // get all patient's past test results
    const getPastAbsTestResults = async () => {
        fetch(`http://localhost:5000/view/abs/${testId}`)
        .then(res => res.json())
        .then(res => setResults(res))
        .then(res=>setCompleteFetch(true))
    }

    const getQuestions = () => {
        fetch("http://localhost:5000/questions/abs")
        .then(res => res.json())
        .then(res => setQuestions(res))
    }

    useEffect(() => {
        getQuestions()
        getPastAbsTestResults()
    }, []);

    const questionResults = (abs_question_no:number, abs_question_desc:string) => {
        console.log(results)
        const renderInfo = completeFetch ?
        (
            <TableRow key={abs_question_no} >
                <TableCell component="th" scope="row">
                    {abs_question_no + ". " + abs_question_desc}
                </TableCell>
                <TableCell align="center">
                    {results[abs_question_no - 1].abs_option}
                </TableCell>
            </TableRow>
        )
        : 
        null
        
        return renderInfo
    }

    return (
        <div className="main-container">
            <h1>ABS Past Tests</h1>
            <div className="questions">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead >
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell align="center">Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {questions.map((question:{abs_question_no:number, abs_question_desc:string}) => (
                            questionResults(question.abs_question_no, question.abs_question_desc)
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default ViewPastAbsTest;