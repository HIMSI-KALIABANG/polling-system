import { useEffect, useState } from 'react';
import candidatesCollection from '../firebase/collection/Candidates';
import { getDocs } from 'firebase/firestore';

const GetCandidates = () => {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getDocs(candidatesCollection)
      .then((collection) =>
        collection.docs.map((doc, _) => {
          return { id: doc.id, ...doc.data() };
        })
      )
      .then((doc) => setDoc(doc))
      .catch((error) => {
        setError(true);
        setMessage(error);
      });
  }, []);

  return { doc, error, message };
};

export default GetCandidates;
