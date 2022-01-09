import { useEffect, useState } from 'react';
import VoterCollection from '../firebase/collection/Voter';
import { onSnapshot } from 'firebase/firestore';

const GetVoter = () => {
  const [voter, setVoter] = useState(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    const getVoter = onSnapshot(VoterCollection, (snapshot, error) => {
      const data = [];
      if (error) setError(true);
      snapshot.docs.map((doc) => {
        data.push({ ...doc.data(), id: doc.id });
        return doc.data();
      });
      setVoter(data);
    });

    return () => getVoter();
  }, []);

  return { voter, error };
};

export default GetVoter;
