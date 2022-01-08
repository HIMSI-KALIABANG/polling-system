import firestore from '../config';
import { collection } from 'firebase/firestore';

const CandidatesCollection = () => {
  const candidates = collection(firestore, 'candidates');

  return candidates;
};

export default CandidatesCollection();
