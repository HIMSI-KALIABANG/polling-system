const CandidatePictureComponent = ({ candidate: { name, count } }) => {
  return (
    <>
      <img src={process.env.PUBLIC_URL + 'img/profile.png'} alt={name} className="w-20" />
      <div className="flex flex-col justify-center items-center w-40">
        <span className="text-xl capitalize text-secondary font-bold">{name}</span>
        <span className="text-lg font-extralight text-secondary">{count}</span>
      </div>
    </>
  );
};

export default CandidatePictureComponent;
