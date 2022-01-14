import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages';
import NotFound from './pages/404.page';
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
          <Route path={'*'} element={<NotFound />} />
        </Routes>
        <div className="fixed bottom-2 left-1/2">
          <div className="flex">
            <span className="text-sm text-secondary font-poppins capitalize">Copyright &#169; 2022</span>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
