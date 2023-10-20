import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Singin/Singin";
import Register from "./components/Signup/Signup";
import Home from './pages/Home';
import Updateprofile from './pages/UpdateProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<Updateprofile />} />
      </Routes>
    </Router>
  );
}

export default App;
