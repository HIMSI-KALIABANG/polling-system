import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages';
import Vote from './pages/vote';

const App = () => {
  const currUsers = JSON.parse(window.localStorage.getItem('users'));

  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/vote'} element={currUsers === null ? <Navigate replace={true} to={'/'} state={'Oops, anda belum bisa voting'} /> : <Vote />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
