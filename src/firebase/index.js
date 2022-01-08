import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebase.config';

const firestoreInitialize = () => {
  const firebase = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebase);

  return firestore;
};
export default firestoreInitialize();
