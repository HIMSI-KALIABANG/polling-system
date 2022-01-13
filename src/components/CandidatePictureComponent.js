import React from 'react';

const CandidatePictureComponent = ({ candidate: { name, count } }) => {
  return (
    <>
      <img src={process.env.PUBLIC_URL + 'img/profile.png'} alt={name} className="w-20" />
      <div className="flex flex-col justify-center items-center w-40">
        <span className="text-xl capitalize">{name}</span>
        <span className="text-lg text-slate-500">{count}</span>
      </div>
    </>
  );
};

export default CandidatePictureComponent;
