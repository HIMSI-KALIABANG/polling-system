import CandidatesComponent from '../components/CandidatesComponent';
import LoadingComponent from '../components/LoadingComponent';
import GetCandidates from '../hooks/getCandidates';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Vote = () => {
  const candidates = GetCandidates();
  const [trial, setTrial] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem('token'));
    if (!currentToken) return navigate('/');

    if (trial) {
      setTimeout(() => {
        setTrial(false);
      }, 1000);
    }
  }, [navigate, trial]);

  return (
    <>
      <div className="min-h-screen bg-primary">
        <div className="lg:mx-32 mx-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="py-8">
              <h4 className="text-xl font-poppins mb-2 text-secondary pb-4">Daftar Kandidat</h4>
              {!candidates.data && <LoadingComponent />}
              {candidates.data &&
                candidates.data.map((candidate, index) => {
                  return <CandidatesComponent candidate={candidate} key={index} trial={trial} setTrial={setTrial} setError={setError} />;
                })}
              {trial && (
                <span disabled className="px-8 mt-2 py-2 rounded-lg bg-primary border-secondary border-2 border-solid text-secondary capitalize shadow-md text-sm  font-poppins">
                  {error ? 'invalid token' : ' Maaf token sudah digunakan'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vote;
