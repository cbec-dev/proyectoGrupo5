
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDT5Ay1UCBhOOvyYm81CVx1N5ndNG5AY5g",
    authDomain: "mingeso-4217f.firebaseapp.com",
    databaseURL: "https://mingeso-4217f.firebaseio.com/",
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;