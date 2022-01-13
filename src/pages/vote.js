import CandidatesComponent from '../components/CandidatesComponent';
import LoadingComponent from '../components/LoadingComponent';
import GetCandidates from '../hooks/getCandidates';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Vote = () => {
  const candidates = GetCandidates();
  const [trial, setTrial] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem('token'));
    if (!currentToken) return navigate('/');
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="md:mx-28 mx-8">
          <div className="py-8">
            <h4 className="text-xl font-poppins mb-2">Daftar Kandidat</h4>
            {trial && (
              <span disabled className="px-8 mt-2 py-2 rounded-lg bg-gray-50  shadow-md text-sm hover:bg-gray-100 font-poppins">
                Maaf token sudah digunakan
              </span>
            )}
          </div>

          {!candidates.data && <LoadingComponent />}
          {candidates.data &&
            candidates.data.map((candidate, index) => {
              return <CandidatesComponent candidate={candidate} key={index} trial={trial} setTrial={setTrial} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Vote;
