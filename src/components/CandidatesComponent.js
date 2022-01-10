import { doc, updateDoc, addDoc } from 'firebase/firestore';
import CandidateCollection from '../firebase/collection/Candidates';
import VoterCollection from '../firebase/collection/Voter';

const CandidatesComponent = ({ candidate: { name, count, id }, trial }) => {
  const voteHandler = (e, id, currCount, name) => {
    e.preventDefault();

    const currUser = JSON.parse(localStorage.getItem('users'));
    const docRef = doc(CandidateCollection, id);

    updateDoc(docRef, {
      count: currCount + 1,
    });

    addDoc(VoterCollection, {
      name: currUser.name,
      ipaddress: currUser.ip,
      status: true,
      candidate: name,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <>
      <div className="flex items-center mb-5">
        <img src={process.env.PUBLIC_URL + 'img/profile.png'} alt={name} className="w-20" />
        <div className="flex flex-col justify-center items-center w-40">
          <span className="text-xl capitalize">{name}</span>
          <span className="text-lg text-slate-500">{count}</span>
        </div>
        <div>
          {!trial && (
            <button onClick={(e) => voteHandler(e, id, count, name)} className="px-8 py-2 rounded-lg bg-gray-50  shadow-md text-sm hover:bg-gray-100 font-poppins">
              Vote
            </button>
          )}
          {trial && (
            <button disabled className="px-8 py-2 rounded-lg bg-gray-50  shadow-md text-sm hover:bg-gray-100 font-poppins">
              Sudah Vote
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CandidatesComponent;
