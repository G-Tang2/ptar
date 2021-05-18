import { storage } from "../firebase/index";

function FacePicture() {
    const storageRef = storage.ref();
    let faceUrl:string[] =[];

    const fetchImages = async () => {
        let result = await storageRef.child("images").child("faces").listAll();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        return Promise.all(urlPromises);
    }
    
    const loadImages = async () => {
         await fetchImages().then(urls => faceUrl = urls);
    }
    loadImages();

    return faceUrl;
}

export default FacePicture;