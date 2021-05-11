import { Paper } from "@material-ui/core";
import ProgressChart from "./ProgressChart"


function Progress(props) {
    return (
        <div>
            <h1>Progress</h1>
            <div className="chart-container">
                <Paper elevation={3}>
                    <ProgressChart patientId={props.patientId}/>
                </Paper>
            </div>
        </div>
    )

}

export default Progress;


