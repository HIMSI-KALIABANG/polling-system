import { useEffect, useState } from 'react';
import candidatesCollection from '../firebase/collection/Candidates';
import { onSnapshot } from 'firebase/firestore';

const GetCandidates = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCandidates = onSnapshot(candidatesCollection, (snapshot, error) => {
      const data = [];
      if (error) setError(error);

      snapshot.docs.map((doc) => {
        data.push({ ...doc.data(), id: doc.id });
        return doc.data();
      });
      setData(data);
    });
    return () => getCandidates();
  }, []);

  return { data, error };
};

export default GetCandidates;
