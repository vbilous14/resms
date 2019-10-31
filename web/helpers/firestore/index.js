import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export default firestore;