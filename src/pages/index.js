import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (state) => {
  const [name, setName] = useState('');
  const [ipAddress, setipAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getIP = ({ ip }) => {
      setipAddress(ip);
    };

    fetch(`https://api.ipify.org?format=json`)
      .then((response) => response.json())
      .then((result) => getIP(result))
      .catch((err) => console.log(err));
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();

    if (name === '') {
      return navigate('/', {
        replace: true,
      });
    }

    localStorage.setItem('users', JSON.stringify({ name: e.target.nama.value, ip: ipAddress }));

    navigate('/vote', {
      replace: true,
    });
  };
  return (
    <>
      <div className="py-4">
        <h1 className="font-poppins text-xl text-center  capitalize">Selamat datang di pemilihan online</h1>
      </div>
      <div className="lg:mx-32 mx-8 ">
        <div className="flex items-center flex-col ">
          <form onSubmit={loginHandler}>
            <input value={name} name={'nama'} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nama Kamu" className="px-4 py-2 w-72 focus:outline-none border-1 border rounded-md shadow-md border-gray-100" />
            <button className="py-2 px-4 ml-0 md:ml-2 md:mb-0 mt-2 bg-gray-100 shadow-md rounded-lg capitalize">Lanjut voting</button>
          </form>
          <span className="text-sm text-gray-500 font-poppins py-2">Your IP Address : {ipAddress}</span>
        </div>
      </div>
    </>
  );
};
export default Home;
