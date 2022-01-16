const CandidatePictureComponent = ({ candidate: { name, image } }) => {
  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/img/${image} `} alt={name} width={image === 'profile.png' ? '120' : '160'} />
      <div className="flex flex-col justify-center items-center ">
        <span className="text-md lg:text-lg xl:text-xl capitalize text-secondary font-bold">{name}</span>
      </div>
    </>
  );
};

export default CandidatePictureComponent;
