import  firebase from 'firebase';
// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyCKL9hHtblQR60j3LvwYtL_eumEswAjvmo',
    authDomain: 'happy-pete-4ac08.firebaseapp.com',
    databaseURL: 'https://happy-pete-4ac08-default-rtdb.firebaseio.com',
    projectId: 'happy-pete-311622',
    storageBucket: 'happy-pete-4ac08.appspot.com',
    messagingSenderId: '77090107117',
    appId: '1:77090107117:android:5aa8d4ba3fede7a57d66e4'
};
let FirebaseConfig;
if(!firebase.apps.length){
    FirebaseConfig = firebase.initializeApp(firebaseConfig);
}


export default FirebaseConfig;
