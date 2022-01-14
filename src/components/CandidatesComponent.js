import { doc, updateDoc } from 'firebase/firestore';
import CandidateCollection from '../firebase/collection/Candidates';
import VoterCollection from '../firebase/collection/Voter';
import GetVoter from '../hooks/getVoter';
import CandidatePictureComponent from './CandidatePictureComponent';
import * as Gi from 'react-icons/gi';

const CandidatesComponent = ({ candidate: { name, count, id }, setTrial, setError }) => {
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
          <button onClick={(e) => voteHandler(e, id, count, name)} className="bg-secondary tracking-wider hover:bg-opacity-90 text-utils text-sm px-6 mt-4 py-2 rounded-lg font-semibold font-poppins uppercase">
            <div className="flex">
              <span>vote</span>
              <span className="m-0.5">
                <Gi.GiVote />
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default CandidatesComponent;
