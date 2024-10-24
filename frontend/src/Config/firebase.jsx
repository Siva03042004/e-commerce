// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxkxl_jqcreD-bp3CheiCyAg1pxklVQVk",
  authDomain: "e-commerce-03042004.firebaseapp.com",
  projectId: "e-commerce-03042004",
  storageBucket: "e-commerce-03042004.appspot.com",
  messagingSenderId: "220144508014",
  appId: "1:220144508014:web:c3d51b2f5976ad9edd9a7f",
  measurementId: "G-WTKPW8DGGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;