import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const firebase = () => {
  initializeApp(firebaseConfig);
};

export default firebase;
