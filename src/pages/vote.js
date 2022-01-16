import CandidatesComponent from '../components/CandidatesComponent';
import LoadingComponent from '../components/LoadingComponent';
import GetCandidates from '../hooks/getCandidates';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Vote = () => {
  const candidates = GetCandidates();
  const [trial, setTrial] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem('token'));
    if (!currentToken) return navigate('/');

    if (trial || success || error) {
      setTimeout(() => {
        setTrial(false);
        setSuccess(false);
        setError(false);
      }, 1000);
    }
  }, [navigate, trial, success, error]);

  return (
    <>
      <div className="min-h-screen bg-primary">
        <div className="lg:mx-32 mx-1 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
            <div className="py-8">
              <h4 className="text-xl font-poppins mb-2 mx-1 text-secondary pb-4">Daftar Kandidat</h4>
              <div className=" flex justify-between">
                {!candidates.data && <LoadingComponent />}
                {candidates.data &&
                  candidates.data.map(({ name, count, image, id }, index) => {
                    return (
                      <>
                        <CandidatesComponent key={index} candidate={{ name, count, image, id }} setTrial={setTrial} setError={setError} setSuccess={setSuccess} />
                      </>
                    );
                  })}
              </div>
              {trial ? (
                <div className="py-8">
                  <span disabled className="px-8 py-2 rounded-lg bg-primary border-secondary border-2 border-solid text-secondary capitalize shadow-md text-sm  font-poppins">
                    Maaf token sudah digunakan
                  </span>
                </div>
              ) : success ? (
                <div className="py-8">
                  <span disabled className="px-8 py-2 rounded-lg bg-primary border-secondary border-2 border-solid text-secondary capitalize shadow-md text-sm  font-poppins">
                    terima kasih sudah voting
                  </span>
                </div>
              ) : (
                error && (
                  <div className="py-8">
                    <span disabled className="px-8 py-2 rounded-lg bg-primary border-secondary border-2 border-solid text-secondary capitalize shadow-md text-sm  font-poppins">
                      Token salah
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vote;
