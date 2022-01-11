import CandidatesComponent from '../components/CandidatesComponent';
import LoadingComponent from '../components/LoadingComponent';
import VoterTableComponent from '../components/VoterTableComponent';
import ClockComponent from '../components/ClockComponent';
import GetCandidates from '../hooks/getCandidates';
import GetVoter from '../hooks/getVoter';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Vote = () => {
  const candidates = GetCandidates();
  const voter = GetVoter();
  const [trial, setTrial] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (voter.voter) {
      const IPList = [];
      voter.voter.map((vote) => IPList.push(vote.ipaddress));
      const userIp = JSON.parse(window.localStorage.getItem('users'));

      if (!userIp) {
        navigate('/');
      }

      if (IPList.includes(userIp.ip)) {
        setTrial(true);
      }
    }
  }, [voter.voter, navigate]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="md:mx-28 mx-8">
          <div className="py-8">
            <h4 className="text-xl font-poppins">Daftar Kandidat</h4>
          </div>
          {!candidates.data && <LoadingComponent />}
          {candidates.data &&
            candidates.data.map((candidate, index) => {
              return <CandidatesComponent candidate={candidate} key={index} trial={trial} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Vote;
