import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'react-learning-cd8aa.firebaseapp.com',
  databaseURL: 'https://react-learning-cd8aa.firebaseio.com',
  projectId: 'react-learning-cd8aa',
  storageBucket: 'react-learning-cd8aa.appspot.com',
  messagingSenderId: '1077185990355'
};

firebase.initializeApp(config);

//firestore setup
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

//auth setup
const auth = firebase.auth();

export { auth, db, firebase };
