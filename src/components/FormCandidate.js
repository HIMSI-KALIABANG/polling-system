import React, { useState, useEffect } from 'react';
import { addDoc } from 'firebase/firestore';
import VoterCollection from '../firebase/collection/Voter';

const FormCandidate = () => {
  const [participant, setParticipant] = useState('');
  const [fillField, setFillField] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (participant === '') {
      setFillField(true);
    } else {
      setFillField(false);
    }

    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  }, [participant]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { token } = e.target;

    if (participant !== '') {
      fetch(process.env.REACT_APP_SHEET_API, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify([[participant, token.value]]),
      })
        .then((response) => response.json())
        .then(async () => {
          console.log('berhasil');
          const result = await addDoc(VoterCollection, {
            name: participant,
            token: token.value,
            status: false,
          });
          if (result) {
            setParticipant('');
            setSuccess(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="text-secondary text-md mb-1 capitalize">Nama Peserta</label>
            <input value={participant} onChange={(e) => setParticipant(e.target.value)} type="text" className="px-4 py-1 rounded-md bg-primary border-secondary border-2 text-secondary mb-2" />
            <label className="text-secondary text-md mb-1 capitalize">Token Peserta</label>
            <input disabled name={'token'} value={Math.random().toString(36).substring(2, 8).toUpperCase()} type="text" className="px-4 py-1 cursor-not-allowed rounded-md bg-primary border-secondary border-2 text-secondary mb-2" />
            {success && <span className="text-secondary text-md capitalize">Berhasil ditambahkan</span>}
            <div className="mt-2">
              {fillField ? (
                <button type="button" disabled className="bg-primary text-secondary border-secondary border-2 rounded-md text-md px-4 py-1 capitalize cursor-not-allowed">
                  Nama masih kosong
                </button>
              ) : (
                <button type="submit" className="bg-secondary text-utils rounded-md text-md px-4 py-2 capitalize">
                  tambah
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCandidate;
