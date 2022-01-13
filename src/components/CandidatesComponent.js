import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import CandidateCollection from '../firebase/collection/Candidates';
import VoterCollection from '../firebase/collection/Voter';
import GetVoter from '../hooks/getVoter';
import CandidatePictureComponent from './CandidatePictureComponent';

const CandidatesComponent = ({ candidate: { name, count, id }, trial, setTrial }) => {
  const [error, setError] = useState(false);
  const { voter } = GetVoter();
  const voteHandler = (e, id, currentCount, name) => {
    e.preventDefault();

    const userList = [];
    voter.map((vote) => userList.push(vote));
    const currentToken = JSON.parse(localStorage.getItem('token')).token;
    const findUserByToken = userList.find((user) => user.token === currentToken);

    if (findUserByToken) {
      if (findUserByToken.status) {
        setTrial(true);
      } else {
        const candidateRef = doc(CandidateCollection, id);
        updateDoc(candidateRef, {
          count: currentCount + 1,
        });

        const voterRef = doc(VoterCollection, findUserByToken.id);
        updateDoc(voterRef, {
          status: true,
          candidate: name,
        });
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="flex items-center mb-5">
        <CandidatePictureComponent candidate={{ name, count }} />
        <div>
          {!trial && error ? (
            <button disabled className="px-8 py-2 rounded-lg bg-gray-50  shadow-md text-sm hover:bg-gray-100 font-poppins">
              Invalid Token
            </button>
          ) : (
            <button onClick={(e) => voteHandler(e, id, count, name)} className="px-8 py-2 rounded-lg bg-gray-50  shadow-md text-sm hover:bg-gray-100 font-poppins">
              Vote
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CandidatesComponent;
