import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClockComponent from '../components/ClockComponent';
import LoadingComponent from '../components/LoadingComponent';
import VoterTableComponent from '../components/VoterTableComponent';
import GetVoter from '../hooks/getVoter';
import GetCandidates from '../hooks/getCandidates';
import CandidatePictureComponent from '../components/CandidatePictureComponent';
import BarChartComponent from '../components/BarChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import { addDoc } from 'firebase/firestore';
import VoterCollection from '../firebase/collection/Voter';

const Admin = () => {
  const [secretKey, setSecretKey] = useState('');
  const [participant, setParticipant] = useState('');
  const [form, setForm] = useState(false);
  const navigate = useNavigate();
  const { voter } = GetVoter();
  const candidates = GetCandidates();

  useEffect(() => {
    const currentSecretKey = JSON.parse(localStorage.getItem('admin'));
    if (!currentSecretKey) return navigate('/');
    if (!currentSecretKey.secret_key) return navigate('/');

    setSecretKey(currentSecretKey.secret_key);
  }, [navigate]);

  useEffect(() => {
    if (secretKey) {
      if (secretKey !== process.env.REACT_APP_SECRET_KEY) {
        return navigate('/');
      }
    }
  }, [secretKey, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { token } = e.target;

    fetch(process.env.REACT_APP_SHEET_API, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify([[participant, token.value]]),
    })
      .then((response) => response.json())
      .then(async () => {
        await addDoc(VoterCollection, {
          name: participant.value,
          token: token.value,
          status: false,
        });

        setParticipant('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="lg:mx-28 mx-8 ">
        {/* <h5 className="font-poppins text-xl py-3">Selamat datang, Admin</h5> */}
        <div className="flex py-4">
          <h4 className="text-xl font-poppins ">Live Preview</h4>
          <div className="ml-auto flex">
            <ClockComponent />
          </div>
        </div>

        {voter ? (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="flex py-8">
                {candidates.data &&
                  candidates.data.map(({ name, count }, index) => {
                    return (
                      <>
                        <CandidatePictureComponent key={index} candidate={{ name, count }} />
                      </>
                    );
                  })}
              </div>
              <div className="flex items-center">
                <div className="py-4 text-center">
                  <h6 className="font-poppins text-lg">Total Pemungutan suara</h6>
                  <span className="font-poppins">{voter && voter.length}</span>
                </div>
                <div className="ml-auto py-4 text-center">
                  <h6 className="font-poppins text-lg">Kandidat Pemenang </h6>
                  <span className="uppercase">{candidates.data && candidates.data.sort((a, b) => b.count - a.count)[0].name}</span>
                </div>
              </div>
            </div>
            {candidates.data && (
              <div className="my-12">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="order-2 lg:order-1 ">
                    <BarChartComponent candidates={candidates.data} />
                  </div>
                  <div className="order-1 lg:order-2">
                    <PieChartComponent candidates={candidates.data} />
                  </div>
                </div>
              </div>
            )}
            <div className="flex">
              <div className="ml-auto mb-2">
                <button onClick={() => setForm(!form)} className="px-4 py-2 bg-gray-50 text-black rounded shadow">
                  Tambah Peserta
                </button>
                {form && (
                  <form onSubmit={submitHandler}>
                    <div className="flex flex-col">
                      <input type="text" onChange={(e) => setParticipant(e.target.value)} value={participant} placeholder="Nama Peserta" className="px-4 py-2 my-2 focus:outline-none shadow-sm rounded bg-gray-200 text-black" />
                      <input type="text" name="token" disabled value={Math.random().toString(36).substring(2, 8).toUpperCase()} className="px-4 py-2 my-2 focus:outline-none shadow-sm rounded bg-gray-200 text-black" />
                      <div className="ml-auto">
                        <button className="px-4 py-2 bg-gray-800 text-white rounded shadow">Submit</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <VoterTableComponent voter={voter} />
          </>
        ) : (
          <div className="flex justify-center">
            <LoadingComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
