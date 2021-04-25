import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCrEo6SnAaZRoyPqOdjfUMmfDgpf__YvAg",
    authDomain: "crwn-db-5af68.firebaseapp.com",
    projectId: "crwn-db-5af68",
    storageBucket: "crwn-db-5af68.appspot.com",
    messagingSenderId: "675919385288",
    appId: "1:675919385288:web:6e91cbcf79366158418bfd",
    measurementId: "G-VSB7EEJ9LX"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;