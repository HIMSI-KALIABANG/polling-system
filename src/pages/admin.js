import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ClockComponent from '../components/ClockComponent';
import LoadingComponent from '../components/LoadingComponent';
import GetVoter from '../hooks/getVoter';
import GetCandidates from '../hooks/getCandidates';
import BarChartComponent from '../components/BarChartComponent';
import PieChartComponent from '../components/PieChartComponent';

const Admin = () => {
  const [secretKey, setSecretKey] = useState('');

  const navigate = useNavigate();
  const { voter } = GetVoter();
  const candidates = GetCandidates();

  useEffect(() => {
    const currentSecretKey = JSON.parse(localStorage.getItem('admin'));
    if (!currentSecretKey) return navigate('/404');
    if (!currentSecretKey.secret_key) return navigate('/404');

    setSecretKey(currentSecretKey.secret_key);
  }, [navigate]);

  useEffect(() => {
    if (secretKey) {
      if (secretKey !== process.env.REACT_APP_SECRET_KEY) {
        return navigate('/404');
      }
    }
  }, [secretKey, navigate]);

  return (
    <div className="min-h-screen bg-primary">
      <div className="lg:mx-32 mx-8 py-8">
        <div className="flex">
          <div className="py-2">
            <h5 className="text-md md:text-xl 2xl:text-2xl font-poppins text-title font-bold uppercase">Live Preview</h5>
          </div>
          <div className="ml-auto flex">
            <ClockComponent />
          </div>
        </div>
        {candidates.data ? (
          <>
            <div className="py-14">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 order-2 lg:order-1">
                  <div className="py-2 flex flex-col mr-2 md:mr-0 items-center justify-center px-6 border-2 border-secondary rounded-xl">
                    <h6 className="text-secondary font-poppins text-sm lg:text-md xl:text-lg capitalize">total suara</h6>
                    <span className="text-secondary font-poppins text-md mt-2">{voter.filter((vote) => vote.status === true).length}</span>
                  </div>
                  <div className="py-2 flex flex-col mr-2 md:mr-0 items-center justify-center px-6 border-2 border-secondary rounded-xl">
                    <h6 className="text-secondary font-poppins text-sm lg:text-md xl:text-lg capitalize">suara terbanyak</h6>
                    <span className="text-secondary font-poppins text-md mt-2 capitalize">
                      {candidates.data.sort((a, b) => b.count - a.count)[0].name === 'Hanna Allisa Qothrun Nada' ? 'Hanna Allisa' : candidates.data.sort((a, b) => b.count - a.count)[0].name}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center order-1 lg:order-2">
                  <div className="w-full xl:w-11/12 ">
                    <div className="flex justify-between">
                      {candidates.data.map(({ name, count, image }, index) => {
                        return (
                          <>
                            <div className="flex flex-col items-center" key={index}>
                              <img src={`${process.env.PUBLIC_URL}/img/${image} `} alt={name} className="px-1" />
                              <span className="text-secondary text-md font-poppins capitalize py-1">{name === 'Hanna Allisa Qothrun Nada' ? 'Hanna Allisa' : name}</span>
                              <span className="text-secondary text-md font-poppins">{count}</span>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex justify-center order-2 lg:order-1">
                  <div className="w-full">
                    <BarChartComponent candidates={candidates.data} />
                  </div>
                </div>
                <div className="flex  justify-center order-1 lg:order-2">
                  <div className="w-8/12 lg:w-1/2">
                    <PieChartComponent candidates={candidates.data} />
                  </div>
                </div>
              </div>
            </div>
            <div className="py-14">
              <div className="pb-6 capitalize lg:w-1/2 w-full flex flex-col lg:flex-row">
                <Link to={'/admin'} className="mb-6 lg:mb-0">
                  <span className="px-8 py-2 bg-primary mr-4 border-secondary border-2 text-secondary text-md rounded-md">Live tabel </span>
                </Link>
                <Link to={'participant'}>
                  <span className="px-8 py-2 bg-primary mr-4 border-secondary border-2 text-secondary text-md rounded-md">tambah peserta</span>
                </Link>
              </div>
              <Outlet />
            </div>
          </>
        ) : (
          <LoadingComponent />
        )}
      </div>
    </div>
  );
};

export default Admin;
