const CandidatePictureComponent = ({ candidate: { name, image } }) => {
  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/img/${image} `} alt={name} />
      <div className="flex flex-col justify-center items-center ">
        <span className="text-md lg:text-lg xl:text-xl py-3 capitalize text-secondary font-bold">{name}</span>
      </div>
    </>
  );
};

export default CandidatePictureComponent;
