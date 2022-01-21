import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Closing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const currentDate = new Date();

    const closeDate = new Date();
    closeDate.setHours(19, 0, 0); // 17 PM

    if (currentDate < closeDate) {
      return navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <div className="min-h-screen bg-primary">
        <div className="flex flex-col items-center">
          <img src={`${process.env.PUBLIC_URL}/img/forbidden.svg`} width={'360'} alt="page ditutup" />
          <h6 className="font-poppins text-xl capitalize font-bold text-secondary tracking-wider">Maaf voting sudah ditutup</h6>
        </div>
      </div>
    </>
  );
};

export default Closing;
