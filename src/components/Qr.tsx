import React from "react";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import { Dialog, DialogTitle, TextField } from "@material-ui/core";
import QrReader from 'react-qr-reader'
import {useHistory} from 'react-router-dom';
import qrImg from "../img/qr-code-img.jpg";

function SimpleDialog(props) {
    const history = useHistory();
    const handleError = err => console.error(err)
    const handleScan = data => {
        if (data) {
            props.setPatientId(data)
            history.push(`/home/${data}`)
            props.handleClose()

        }
    }
  
    return (
      <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
        <DialogTitle id="simple-dialog-title">Place QR code within the red square</DialogTitle>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
      </Dialog>
    );
  }

function Qr(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => props.setPatientId(e.target.value)
    return (
        <div className="main-container">
            <div className="inner-container">
                <h1>Scan QR Code</h1>
                <div>
                    <ol className="list">
                        <li>Click the Scan button below.</li>
                        <li>Point your device at a QR code so that the entire QR code is clearly visible within the red square.</li>
                    </ol>
                    <div>
                        <img src={qrImg} alt="qr-code-image" style={{width:"40vw"}}/>
                    </div>
                </div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Scan
                </Button>
                <SimpleDialog 
                    patientId={props.patientId}
                    setPatientId={props.setPatientId} 
                    open={open} 
                    handleClose={handleClose} 
                />
                {/* {TODO: REMOVE THIS BEFORE DEPLOYMENT} */}
                <div style={{borderStyle:"solid", padding:"20px", margin: "20px 0"}}>
                    <div>
                        Development purposes:
                    </div>
                    <TextField label="Patient Id" onChange = {handleChange} variant="filled" fullWidth size="small" value={props.patientId}/>
                    <div>
                        <Link to={`/home/${props.patientId}`} className="button-link">
                            <Button variant="contained" color="primary">
                                Start
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Qr;