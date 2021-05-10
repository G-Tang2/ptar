import firebase from "firebase/app";
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// should put these info in an .env file
const firebaseConfig = {
    apiKey: "AIzaSyD2MCMh4fFGZYXQMMFswlP-4WH_wMXKnjk",
    authDomain: "ptar-16ca6.firebaseapp.com",
    projectId: "ptar-16ca6",
    storageBucket: "ptar-16ca6.appspot.com",
    messagingSenderId: "498518998140",
    appId: "1:498518998140:web:6875ca272b5b7bd6f29df9",
    measurementId: "G-PSX08P6HVE"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default };