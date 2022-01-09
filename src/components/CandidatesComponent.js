import { doc, updateDoc } from 'firebase/firestore';
import CandidateCollection from '../firebase/collection/Candidates';

const candidatesComponent = ({ candidate: { name, count, id } }) => {
  const voteHandler = (e, id, currCount) => {
    e.preventDefault();
    const docRef = doc(CandidateCollection, id);

    updateDoc(docRef, {
      count: currCount + 1,
    });
  };

  return (
    <>
      <div className="flex items-center mb-5">
        <img src={process.env.PUBLIC_URL + 'img/profile.png'} alt="profile image" className="w-20" />
        <div className="flex flex-col justify-center items-center w-40">
          <span className="text-xl capitalize">{name}</span>
          <span className="text-lg text-slate-500">{count}</span>
        </div>
        <div>
          <button onClick={(e) => voteHandler(e, id, count)} className="px-8 py-2 rounded-lg bg-gray-50  shadow-md text-sm hover:bg-gray-100 font-poppins">
            Vote
          </button>
        </div>
      </div>
    </>
  );
};

export default candidatesComponent;
