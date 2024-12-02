import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import WriteCard from './components/WriteCard'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Reader from './components/Reader';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/read" element={<Reader />} />
          <Route path="/admin/write-tag" element={<WriteCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;