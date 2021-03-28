import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBHU-ZP0Em440-NTJPJFkvd20Py4vjAPOY",
    authDomain: "les-ludions.firebaseapp.com",
    projectId: "les-ludions",
    storageBucket: "les-ludions.appspot.com",
    messagingSenderId: "400236988562",
    appId: "1:400236988562:web:7c1f3f6624c1aee400be4b",
    measurementId: "G-VJWL334MJ0"
  };

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);