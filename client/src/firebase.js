import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCLH-wQrNIl1NnCv9LLINsASzOUZXdrcD4',
  authDomain: 'themernsocial.firebaseapp.com',
  projectId: 'themernsocial',
  storageBucket: 'themernsocial.appspot.com',
  messagingSenderId: '106269308367',
  appId: '1:106269308367:web:5fa9ccf2352d0be9474eba',
};

//	Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

//	Initialize services
const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();

//	Timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectStorage, timestamp, app };
