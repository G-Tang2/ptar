import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function PicCarousel() {
    return (
        <Carousel>
            <div className = "PicCarousel">
                <img src="./assets/bird1.jpeg" />
                <p className="pic1">A BIRD</p>
            </div>
            <div>
                <img src="./assets/bird2.png" />
                <p className="pic2">DEMO 2</p>
            </div>
            <div>
                <img src="./assets/bird3.jpeg" />
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