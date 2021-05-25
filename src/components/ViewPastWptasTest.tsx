import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";

function ViewPastWptasTest(props) {
    const { testId } = props.match.params
    const [questions, setQuestions] = useState<{wptas_question_no:number, wptas_question_desc:string}[]>([])
    const [results, setResults] = useState<{test_score:number, wptas_mc_given:boolean, wptas_correct:boolean, wptas_ans_note:string}[]>([])
    const [completeFetch, setCompleteFetch] = useState(false)

    console.log(testId);
    // get all patient's past test results
    const getPastWptasTestResults = async () => {
        fetch(`http://localhost:5000/view/wptas/${testId}`)
        .then(res => res.json())
        .then(res => setResults(res))
        .then(res=>setCompleteFetch(true))
    }

    const getQuestions = () => {
        fetch("http://localhost:5000/questions/wptas")
        .then(res => res.json())
        .then(res => setQuestions(res))
    }

    useEffect(() => {
        getQuestions()
        getPastWptasTestResults()
    }, []);

    const questionResults = (wptas_question_no:number, wptas_question_desc:string) => {
        const wptas_correct = results[wptas_question_no - 1].wptas_correct
        const mc_given = results[wptas_question_no - 1].wptas_mc_given;
        return(
            <TableRow key={wptas_question_no} >
                <TableCell component="th" scope="row">
                    {wptas_question_no + ". " + wptas_question_desc}
                </TableCell>
                <TableCell align="center" className={wptas_correct ? "good-result":"bad-result"}>
                    {wptas_correct ? "Y" : "N"}
                </TableCell>
                <TableCell align="center" className={!mc_given ? "good-result":"bad-result"}>
                    {!mc_given ? "Y" : "N"}
                </TableCell>
                <TableCell >
                    {results[wptas_question_no - 1].wptas_ans_note}
                </TableCell>
            </TableRow>
        )
    }
    const renderInfo = completeFetch ? (
        <div className="main-container">
            <h1>WPTAS Past Tests</h1>
            <div className="questions">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead >
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell align="center">Correct</TableCell>
                                <TableCell align="center">MC Not Given</TableCell>
                                <TableCell>Note</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {questions.map((question:{wptas_question_no:number, wptas_question_desc:string}) => (
                            questionResults(question.wptas_question_no, question.wptas_question_desc)
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <h3 style={{paddingBottom:30}}>Total score: {results[0].test_score}</h3>
        </div>
    )
    :
    null
    return renderInfo
}

export default ViewPastWptasTest;