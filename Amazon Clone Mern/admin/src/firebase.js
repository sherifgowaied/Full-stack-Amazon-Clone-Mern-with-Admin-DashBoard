// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8L1pcYZ4UTJp4h9g3rBIXfRfEDJ6l1yA",
  authDomain: "fir-f418d.firebaseapp.com",
  projectId: "fir-f418d",
  storageBucket: "fir-f418d.appspot.com",
  messagingSenderId: "874780886478",
  appId: "1:874780886478:web:58356ceebeeb584590579f",
  measurementId: "G-802ZYEN7WE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;