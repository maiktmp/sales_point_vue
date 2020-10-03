import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDx1mXCroR81qHys9OOJNCQgitU1hgVWJg",
    authDomain: "foodshoop-7d845.firebaseapp.com",
    databaseURL: "https://foodshoop-7d845.firebaseio.com",
    projectId: "foodshoop-7d845",
    storageBucket: "foodshoop-7d845.appspot.com",
    messagingSenderId: "771383575872",
    appId: "1:771383575872:web:a1ad9bf9ec51bf100066a5",
    measurementId: "G-M4NBLCWYNK"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();