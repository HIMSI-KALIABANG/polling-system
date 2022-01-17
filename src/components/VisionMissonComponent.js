import { useParams } from 'react-router-dom';

const VisionMissonComponent = () => {
  const params = useParams();

  return (
    <>
      <h3 className="text-md lg:text-lg mx-4 py-2 uppercase text-secondary">{params.name}</h3>
      <div className="flex flex-col md:flex-row mx-2">
        <div className="my-2 md:my-0 mx-0 md:mx-2">
          <img src={`${process.env.PUBLIC_URL}/img/${params.name}/2.png`} alt="Visi" width={360} />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}/img/${params.name}/3.png`} alt="Visi" width={360} />
        </div>
      </div>
    </>
  );
};

export default VisionMissonComponent;
