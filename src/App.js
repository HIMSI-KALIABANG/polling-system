import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages';
import Admin from './pages/admin';
import Vote from './pages/vote';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/vote'} element={<Vote />} />
          <Route path={'/admin'} element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
