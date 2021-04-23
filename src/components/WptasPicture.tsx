import React, { useState } from "react";
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

function ImageSelector() {
    const [count, setCount] = useState(0);

    const highlightEffect = {
        'padding': '5px',
        'backgroundColor': '#00BFFF',
        'borderWidth': 'medium',
        'borderStyle': 'solid',
        'borderColor': '#00BFFF'
    };

    const highlightImage = () => {
        if (count === 3) {
            console.log('Cannot select more than 3 images.')
            return;
        }

        var images = document.getElementsByTagName('img');
        var imgCount = images.length;
        
        for (let i = 0; i < imgCount; i++) {
            images[i].onclick = function() {
                if (images[i].style.borderStyle === highlightEffect.borderStyle) {
                    setCount(count - 1);
                    console.log(count);
                    images[i].style.padding = 'auto';
                    images[i].style.background = 'none';
                    images[i].style.border = 'none';
                }
                else {
                    setCount(count + 1);
                    console.log(count);
                    images[i].style.padding = highlightEffect.padding;
                    images[i].style.backgroundColor = highlightEffect.backgroundColor;
                    images[i].style.borderWidth = highlightEffect.borderWidth;
                    images[i].style.borderStyle = highlightEffect.borderStyle;
                    images[i].style.borderColor = highlightEffect.borderColor;
                }
            }
        }
    }

    return (
        <div className = "picsRow1">
            <div className = "pic1">
                <img src={pic1} alt = "bird1" height = {200} width = {200} onClick={highlightImage}/>
                <img src={pic2} alt = "bird2" height = {200} width = {200} onClick={highlightImage}/>
                <img src={pic3} alt = "bird3" height = {200} width = {200} onClick={highlightImage}/>
            </div>
            <div className = "picsRow2">
                <img src={pic4} alt = "bird4" height = {200} width = {200} onClick={highlightImage}/>
                <img src={pic5} alt = "bird5" height = {200} width = {200} onClick={highlightImage}/>
                <img src={pic6} alt = "bird6" height = {200} width = {200} onClick={highlightImage}/>
            </div>
            <div className = "picRow3">
                <img src={pic7} alt = "bird7" height = {200} width = {200} onClick={highlightImage}/>
                <img src={pic8} alt = "bird8" height = {200} width = {200} onClick={highlightImage}/>
                <img src={pic9} alt = "bird9" height = {200} width = {200} onClick={highlightImage}/>
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