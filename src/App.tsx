import './App.css'
import Home from './pages/Home';
import Github from './pages/Github';
import ShowMap from './pages/ShowMap';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminstartpage" element={<Home />} />
        <Route path="/customerstartpage" element={<Home />} />
        <Route path="github/callback" element={<Github/>} />
         <Route path="/map/:city" element={<ShowMap/>} />
        {/*<Route path="/user/:githubId" element={<AdminUserOverviewPage />} />
        <Route path="/adminmapnavigation" element={<AdminMapNavigation />} /> */}
        </Routes>
      </Router>
      <div data-testid="app-test"></div>
    </>
  )
}

export default App

