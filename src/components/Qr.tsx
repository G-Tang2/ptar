import React from "react";
import Button from '@material-ui/core/Button';


function Qr() {
  return (
    <div>
        <h1>Scan QR Code</h1>
        <div>
            <ol>
                <li>Click the start button below</li>
                <li>Point your device at a QR code so that the entire QR code is clearly visible on your screen</li>
            </ol>
        </div>
        <div>
            <Button variant="contained" fullWidth={true}>
                Start
            </Button>
        </div>
        
    </div>
  );
}


export default Qr;