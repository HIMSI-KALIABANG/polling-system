import firestore from '../';
import { collection } from 'firebase/firestore';

const CandidatesCollection = collection(firestore, 'candidates');

export default CandidatesCollection;
