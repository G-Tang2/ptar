import React, { useEffect, useState } from "react";
import { storage } from "../firebase/index";
import { Button, Grid} from "@material-ui/core";

// function getRandom(arr, n) {
//     let result = new Array(n),
//         len = arr.length,
//         taken = new Array(len);
//     console.log(len);
//     if (n > len)
//         throw new RangeError("getRandom: more elements taken than available");
//     while (n--) {
//         var x = Math.floor(Math.random() * len);
//         result[n] = arr[x in taken ? taken[x] : x];
//         taken[x] = --len in taken ? taken[len] : len;
//     }
//     return result;
// }

function FacePicture() {
    const storageRef = storage.ref();
    const [faceUrl, setFaceUrl] = useState<string[]>([]);
    const [choice, setChoice] = useState<string>("");
    // const [multichoice, setMultichoice] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            let result = await storageRef.child("images").child("faces").listAll();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
            return Promise.all(urlPromises);
        }
        
        const loadImages = async () => {
            const urls:string[] = await fetchImages();
            setFaceUrl(urls);
        }
        loadImages();
    }, []);

    const highlightImage = (e: any) => {
        const images = document.getElementById(e.target.id);
        if (images != null) {
            if (images.className === "highlight") {
                images.className = "no-highlight"
                setChoice("")
            }
            else {
                if (choice.length === 0) {
                    setChoice(e.target.id);
                    images.className = "highlight";
                }
            }
        }
    }

    return (
        <div className = "FacePicture">
            <Grid container spacing={1} justify="center" className = "pics">
                {faceUrl.map(url => {
                    return (
                    <Grid item xs={4}>
                        <img className='no-highlight' id = {url} src={url} alt = {url} height = {200} width = {150} onClick={highlightImage}/>
                    </Grid>
                    )
                })}
            </Grid>
            <div className="button-wrapper" >
                {choice.length > 0 ? 
                        <Button variant="contained" color="primary" className="submit-button">Submit</Button>:
                        <Button variant="contained" color="primary" className="submit-button" disabled>Submit</Button>}
            </div>
        </div>
    )
}

export default FacePicture;