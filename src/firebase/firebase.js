import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCgU9Ru-B4wMlPFOZRuG-gFFKn-4FeKFXI',
  authDomain: 'kuis-2-7c680.firebaseapp.com',
  projectId: 'kuis-2-7c680',
  storageBucket: 'kuis-2-7c680.appspot.com',
  messagingSenderId: '76522495036',
  appId: '1:76522495036:web:52c287646da64c27b6f739',
  measurementId: 'G-JB34PT36RQ',
};
export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
export default firebase;
