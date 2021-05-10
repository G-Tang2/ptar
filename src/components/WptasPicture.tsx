import React, { useEffect, useState } from "react";
import firebase from "firebase/app"
import { storage } from "../firebase/index";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid } from "@material-ui/core";


function WptasPicture() {
    const storageRef = storage.ref();
    const [files, setFiles] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    var choice: string[] = ['none', 'none', 'none'];

    useEffect(() => {
        const fetchImages = async () => {
    
        let result = await storageRef.child("images").listAll();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        
        return Promise.all(urlPromises);
    
        }
        
        const loadImages = async () => {
            const urls:any[] = await fetchImages();
            setFiles(urls);
        }
        loadImages();
        }, []);

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
        <div className = "WptasPicture">
            <h1>WESTMEAD P.T.A SCALE - PICTURES</h1>
            <p>Which pictures were shown yesterday?</p>
            <Grid container spacing={1} justify="center" className = "pics">
                {files.map(url => {
                    return (
                    <Grid item xs={4}>
                        <img className='no-highlight' id = {url} src={url} alt = {url} height = {200} width = {200} onClick={highlightImage}/>
                    </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default WptasPicture;