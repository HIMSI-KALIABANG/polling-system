import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Closing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const currentDate = new Date();

    const closeDate = new Date();
    closeDate.setHours(21, 30, 0); // 20 PM

    if (currentDate < closeDate) {
      return navigate('/404');
    } else {
      localStorage.removeItem('token');
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
