import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetVoter from '../hooks/getVoter';

const Home = () => {
  const [token, setToken] = useState('');
  const [invalidToken, setInvalidToken] = useState(false);
  const [rules, setRules] = useState(false);
  const navigate = useNavigate();

  const { voter } = GetVoter();

  useEffect(() => {
    if (token === '') {
      setRules(true);
    } else {
      setRules(false);
    }
  }, [token]);

  const loginHandler = (e) => {
    e.preventDefault();

    if (token === '') {
      return navigate('/', {
        replace: true,
      });
    }

    localStorage.removeItem('admin');

    if (token === process.env.REACT_APP_SECRET_KEY) {
      localStorage.setItem('admin', JSON.stringify({ secret_key: process.env.REACT_APP_SECRET_KEY }));
      return navigate('/admin');
    }

    const validToken = voter.filter((vote) => vote.token == token);

    if (validToken.length > 0) {
      localStorage.removeItem('token');
      localStorage.setItem('token', JSON.stringify({ token: validToken[0].token }));
      return navigate('/vote');
    }

    setInvalidToken(true);
  };
  return (
    <>
      <div className="py-4">
        <h1 className="font-poppins text-xl text-center  capitalize">Selamat datang di pemilihan online</h1>
      </div>
      <div className="lg:mx-32 mx-8 ">
        <div className="flex items-center flex-col ">
          <form onSubmit={loginHandler}>
            <input value={token} name={'nama'} onChange={(e) => setToken(e.target.value)} type="text" placeholder="Token" className="px-4 py-2 w-72 focus:outline-none border-1 border rounded-md shadow-md border-gray-100" />
            {rules ? (
              <button disabled className="py-2 px-4 ml-0 md:ml-2 md:mb-0 mt-2 bg-gray-100 shadow-md rounded-lg capitalize">
                Token tidak boleh kosong
              </button>
            ) : (
              <button className="py-2 px-4 ml-0 md:ml-2 md:mb-0 mt-2 bg-gray-100 shadow-md rounded-lg capitalize">Lanjut voting</button>
            )}
          </form>
          <span className="text-sm text-gray-500 font-poppins py-2">{invalidToken ? 'Token Salah' : ''}</span>
        </div>
      </div>
    </>
  );
};
export default Home;
