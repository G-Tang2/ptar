import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import pic1 from './assets/bird1.jpg';
import pic2 from './assets/bird2.png';
import pic3 from './assets/bird3.jpg';

function PicCarousel() {
    return (
        <Carousel>
            <div className = "PicCarousel">
                <img src={pic1} />
                <p className="pic1">A BIRD</p>
            </div>
            <div>
                <img src={pic2} />
                <p className="pic2">DEMO 2</p>
            </div>
            <div>
                <img src={pic3} />
                <p className="pic3">DEMO 3</p>
            </div>
        </Carousel>
    );
}

function WptasPicture() {
    return (
        <div className = "WptasPicture">
            <h1>WESTMEAD P.T.A SCALE - PICTURES</h1>
            <p>Which pictures were shown yesterday?</p>
            {PicCarousel()}
        </div>
    );
}

export default WptasPicture;