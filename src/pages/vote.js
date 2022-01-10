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
        <div className="py-8 md:mx-28 mx-8 md:text-center">
          <h4 className="text-xl font-poppins">Total Pemungutan Suara</h4>
          {!voter.voter && <span className="font-poppins text-sm">Tunggu Sebentar</span>}
          <span className="text-lg text-slate-500">{voter.voter && voter.voter.length}</span>
          <div className="mt-16">
            <h4 className="text-xl font-poppins">Urutan Teratas </h4>
            {!candidates.data && <span className="font-poppins text-sm">Tunggu Sebentar</span>}
            <span className="uppercase">{candidates.data && candidates.data.sort((a, b) => b.count - a.count)[0].name}</span>
          </div>
        </div>
      </div>
      <div className="mx-8 md:mx-28">
        <div className="flex my-4">
          <h4 className="text-xl font-poppins ">Live Preview</h4>
          <div className="ml-auto flex">
            <ClockComponent />
          </div>
        </div>
        {!voter.voter && <LoadingComponent />}
        <VoterTableComponent voter={voter.voter} />
      </div>
    </>
  );
};

export default Vote;
