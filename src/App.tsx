import './App.css'
import Home from './pages/Home';
import Github from './pages/Github';
import ShowMap from './pages/ShowMap';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyRentals from './pages/MyRentals';


function App() {
  return (
    <div className="flex items-center justify-center h-full">
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminstartpage" element={<Home />} />
        <Route path="/customerstartpage" element={<Home />} />
        <Route path="github/callback" element={<Github/>} />
        <Route path="/map/:city" element={<ShowMap/>} />
        <Route path="/myrentals" element={<MyRentals/>} />
        {/*<Route path="/user/:githubId" element={<AdminUserOverviewPage />} />
        <Route path="/adminmapnavigation" element={<AdminMapNavigation />} /> */}
        </Routes>
      </Router>
      <ToastContainer />
      <div data-testid="app-test"></div>
      </div>
  )
}

export default App;
