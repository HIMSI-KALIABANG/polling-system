import GetCandidates from '../hooks/getCandidates';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import VoteComponent from '../components/VoteComponent';

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
        <div className="lg:mx-32 mx-0 py-8">
          <VoteComponent candidates={candidates} error={error} trial={trial} success={success} setError={setError} setSuccess={setSuccess} setTrial={setTrial} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Vote;
