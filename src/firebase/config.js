import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseInitalize = () => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_DOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER,
    appId: process.env.REACT_APP_APPID,
  };

  const firebase = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebase);

  return firestore;
};

export default firebaseInitalize();
