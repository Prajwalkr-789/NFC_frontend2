import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import WriteCard from './components/WriteCard'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Reader from './components/Reader';
import ExtraPage from './components/ExtraPage';
import Validate from './components/Validate';
import Writer from './components/Writer';


function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/read" element={<Reader />} />
          <Route path="/write" element={<Writer />} />
          <Route path="/validate" element={<Validate />} />
          <Route path="/extra" element={<ExtraPage />} />
          <Route path="/admin/write-tag" element={<WriteCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;