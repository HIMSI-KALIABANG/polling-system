import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormCandidate from './components/FormCandidate';
import GolputTableComponent from './components/GolputTableComponent';
import VisionMissonComponent from './components/VisionMissonComponent';
import VoterTableComponent from './components/VoterTableComponent';
import GetVoter from './hooks/getVoter';
import Home from './pages';
import NotFound from './pages/404.page';
import Admin from './pages/admin';
import Closing from './pages/Closing';
import Vote from './pages/vote';

const App = () => {
  const { voter } = GetVoter();

  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/closing'} element={<Closing />} />
          <Route path={'/vote'} element={<Vote />}>
            <Route path=":name" element={<VisionMissonComponent />} />
          </Route>
          <Route path={'/admin'} element={<Admin />}>
            <Route path={'/admin'} element={<VoterTableComponent voter={voter} />} />
            <Route path={'participant'} element={<FormCandidate />} />
            <Route path={'golput'} element={<GolputTableComponent voter={voter} />} />
          </Route>
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
