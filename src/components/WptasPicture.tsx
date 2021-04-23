import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
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
import { TransferWithinAStationSharp } from "@material-ui/icons";

function ImageSelector() {
    const [isSelected, SetIsSelected] = useState(false);

    const highlightEffect = {
        'padding': '3px',
        'backgroundColor': '#eded01',
        'borderSize': '1ps',
        'borderStyle': 'dashed',
        'borderColor': '#0001fe'
    };

    const highlightImage = (e: String) => {
        var allimgs = document.getElementsByTagName('img');
        var nrallimgs = allimgs.length;
        
        for (let i = 0; i < nrallimgs; i++) {
            allimgs[i].onclick = function() {
                if (this.style.borderStyle == highlightEffect.borderStyle) {
                    this.style.padding = 'auto';
                    this.style.background = 'none';
                    this.style.border = 'none';
                }
                else {
                    this.style.padding = highlightEffect.padding;
                    this.style.backgroundColor = highlightEffect.backgroundColor;
                    this.style.borderSize = highlightEffect.borderSize;
                    this.style.borderStyle = highlightEffect.borderStyle;
                    this.style.borderColor = highlightEffect.borderColor;
                }
            }
        }
    }

    // const myFunction = (e) => {
    //     // get the element taht you want -> e.getElement
    //     // check if it's highlighted or not
    //     // change the class name to be opposite
    // }

    return (
        <div className = "picsRow1">
            <div className = "pic1">
                <img  src={pic1} alt = "bird1" height = {200} width = {200} onClick={() => highlightImage}/>
                <img src={pic2} alt = "bird2" height = {200} width = {200}/>
                <img src={pic3} alt = "bird3" height = {200} width = {200}/>
            </div>
            <div className = "picsRow2">
                <img src={pic4} alt = "bird4" height = {200} width = {200}/>
                <img src={pic5} alt = "bird5" height = {200} width = {200}/>
                <img src={pic6} alt = "bird6" height = {200} width = {200}/>
            </div>
            <div className = "picRow3">
                <img src={pic7} alt = "bird7" height = {200} width = {200}/>
                <img src={pic8} alt = "bird8" height = {200} width = {200}/>
                <img src={pic9} alt = "bird9" height = {200} width = {200}/>
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