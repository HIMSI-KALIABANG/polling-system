import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetVoter from '../hooks/getVoter';
import * as Bs from 'react-icons/bs';

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

    if (invalidToken) {
      setTimeout(() => {
        setInvalidToken(false);
      }, 1000);
    }
  }, [token, invalidToken]);

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

    const validToken = voter.filter((vote) => vote.token === token);

    if (validToken.length > 0) {
      localStorage.removeItem('token');
      localStorage.setItem('token', JSON.stringify({ token: validToken[0].token }));
      return navigate('/vote');
    }

    setInvalidToken(true);
  };
  return (
    <>
      <div className="min-h-screen bg-primary">
        <div className="lg:mx-32 mx-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-0 md:p-6 xl:p-12 order-2 md:order-1">
              <div className="w-full p-0 2xl:p-12">
                <h3 className="text-2xl xl:text-4xl font-extrabold tracking-wider font-poppins text-title capitalize">selamat datang di </h3>
                <h2 className="text-2xl xl:text-4xl font-extrabold my-1 tracking-wider font-poppins text-title capitalize">
                  Pemilihan <span className="text-secondary"> Suara Online Himsi vote</span>{' '}
                </h2>
                <h4 className="text-md 2xl:text-lg text-opacity-60 font-extralight font-poppins text-title capitalize">
                  <i className="text-opacity-20">Pilih sesuai hati nurani dan luber judil</i>
                </h4>
                <div className="my-6">
                  <form onSubmit={loginHandler}>
                    <div className="flex flex-col">
                      <input
                        value={token}
                        name={'nama'}
                        onChange={(e) => setToken(e.target.value)}
                        type="text"
                        placeholder="Token"
                        autoComplete="off"
                        className="focus:border-secondary px-4 py-3 md:py-2 xl:py-3 rounded-xl bg-primary border-2 border-solid border-secondary text-secondary"
                      />
                      {invalidToken && <span className="text-sm px-3 py-2 transition-all text-red-500 font-poppins">Token Salah</span>}
                      {rules ? (
                        <div>
                          <button
                            disabled
                            className="bg-primary mt-4 cursor-not-allowed text-secondary px-6 py-2 md:py-1 lg:py-2 rounded-lg text-md md:text-sm lg:text-md border-secondary border-solid border-2 font-semibold uppercase font-poppins"
                          >
                            Token tidak boleh kosong
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button className="bg-secondary tracking-wider hover:bg-opacity-90 text-utils text-sm px-6 mt-4 py-2 rounded-lg font-semibold font-poppins uppercase">
                            <span className="flex">
                              Submit TOken
                              <span className="m-1">
                                <Bs.BsFillArrowRightSquareFill />
                              </span>
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="p-0 lg:p-4  2xl:p-12 order-1 md:order-2">
              <img src={process.env.PUBLIC_URL + '/img/voting.svg'} alt="voting header" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
