import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyCuBhEcxDwQ_b7lXAS8e6-LGknhzG5YvVA",
    authDomain: "cloudsystems-2f17a.firebaseapp.com",
    databaseURL: "https://cloudsystems-2f17a.firebaseio.com",
    projectId: "cloudsystems-2f17a",
    storageBucket: "cloudsystems-2f17a.appspot.com",
    messagingSenderId: "348343222385"
  };

export const init = firebase.initializeApp(config);