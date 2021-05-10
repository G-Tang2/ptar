import React, { useState } from "react";
import firebase from "firebase/app"
import { storage } from "../firebase";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import pic1 from './assets/bird1.jpg';
import pic2 from './assets/bird2.png';
import pic3 from './assets/bird3.jpg';
import pic4 from './assets/bird4.jpg';
import pic5 from './assets/bird5.jpg';
import pic6 from './assets/bird6.png';
import pic7 from './assets/bird7.jpg';
import pic8 from './assets/bird8.jpg';
import pic9 from './assets/bird9.jpg';

const ref = firebase.storage().ref();

function ImageSelector() {
    const [count, setCount] = useState(0);
    var choice: string[] = ['none', 'none', 'none'];

    const getImage = (image: any) => {
        // ref.child{`${image}.jpg`}.getDownloadURL().then()
    }

    const highlightImage = (e: any) => {
        console.log(e);
        var images = document.getElementById(e.target.id);
        
        if (images != null) {
            if (images.className === "highlight") {
                images.className = "no-highlight"
                setCount(count - 1);
                for (let i = 0; i < 3; i++) {
                    if (choice[i] == e.target.id) {
                        choice[i] = 'none';
                        console.log(choice[i]);
                    }
                }
            }
            else {
                if (count >= 3) {
                    console.log('Cannot select more than 3 images.')
                    return;
                }
                setCount(count + 1);
                images.className = "highlight";
                for (let i = 0; i < 3; i++) {
                    if (choice[i] === 'none') {
                        choice[i] = e.target.id;
                        console.log(choice[i]);
                    }
                }
            }
        }
    }

    return (
        <div className = "pics">
            <div className = "picRow1">
                <img className = 'no-highlight' id = 'pic1' src={pic1} alt = "bird1" height = {200} width = {200} onClick={(e) => highlightImage(e)}/>
                <img className = 'no-highlight' id = 'pic2' src={pic2} alt = "bird2" height = {200} width = {200} onClick={(e) => highlightImage(e)}/>
                <img className = 'no-highlight' id = 'pic3' src={pic3} alt = "bird3" height = {200} width = {200} onClick={(e) => highlightImage(e)}/>
            </div>
            <div className = "picRow2">
                <img className = 'no-highlight' id = 'pic4' src={pic4} alt = "bird4" height = {200} width = {200} onClick={(e) => highlightImage(e)}/>
                <img className = 'no-highlight' id = 'pic5' src={pic5} alt = "bird5" height = {200} width = {200} onClick={(e) => highlightImage(e)}/>
                <img className = 'no-highlight' id = 'pic6' src={pic6} alt = "bird6" height = {200} width = {200} onClick={(e) => highlightImage(e)}/>
            </div>
            <div className = "picRow3">
                <img className = 'no-highlight' id = 'pic7' src={pic7} alt = "bird7" height = {200} width = {200} onClick={(e) => highlightImage(e)}/>
                <img className = 'no-highlight' id = 'pic8' src={pic8} alt = "bird8" height = {200} width = {200} onClick={(e) => highlightImage(e)}/>
                <img className = 'no-highlight' id = 'pic9' src={pic9} alt = "bird9" height = {200} width = {200} onClick={(e) => highlightImage(e)}/>
            </div>
        </div>
    )
}

function WptasPicture() {
    return (
        <div className = "WptasPicture">
            <h1>WESTMEAD P.T.A SCALE - PICTURES</h1>
            <p>Which pictures were shown yesterday?</p>
            {ImageSelector()}
        </div>
    );
}

export default WptasPicture;