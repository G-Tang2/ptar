import AvailableTest from './AvailableTest';
import Progress from "./Progress";
import PastTest from "./PastTest";
import { Paper } from "@material-ui/core";
import { useEffect } from "react";

function MainPage(props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (<div className='main-container'>
        <Paper className="main-page-section" variant="outlined">
            <AvailableTest patientId={props.patientId}/>
        </Paper>
        <Paper className="main-page-section" variant="outlined">
            <Progress patientId={props.patientId}/>
        </Paper>
        <Paper className="main-page-section" variant="outlined">
            <PastTest patientId={props.patientId}/>
        </Paper>
    </div>)
}

export default MainPage;