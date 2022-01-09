import firestore from '../';
import { collection } from 'firebase/firestore';

const VoterCollection = collection(firestore, 'voter');

export default VoterCollection;
