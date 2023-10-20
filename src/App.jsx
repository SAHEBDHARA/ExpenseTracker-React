import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Singin/Singin";
import Register from "./components/Signup/Signup";
import Home from './pages/Home';
import Updateprofile from './pages/UpdateProfile';
import { AuthContext } from './context/authContext';

function App() {

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children }) => {
    return currentUser ? (children) : <Navigate to="/login"/>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <RequireAuth>
              <Home />
            </RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={
            <RequireAuth>
              <Updateprofile />
            </RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
