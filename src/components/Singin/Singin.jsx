import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {  getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, seError] = useState(false);
  const [newerr, setNewerr] = useState("")
  const [resetMessage, setResetMeassage] = useState('')


  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordReset = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, formData.email);
      // Password reset email sent successfully
      // You can display a message to the user or redirect to a confirmation page
      setResetMeassage("Link sent successfully");
    } catch (error) {
      // Handle the error, e.g., email not found, server error, etc.
      console.error(error);
      setResetMeassage(error.AuthContext.message);
    }
  };



  const handleLogin = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
  
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
    } catch (error) {
      seError(true);
      console.error(error);
      const errorCode = error.code;
      setNewerr(errorCode);
      console.log(newerr);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <span onClick={handlePasswordReset} className='block text-center text-red cursor-pointer'>Forgot passowrd?</span>
          {newerr && <span className='block text-center text-red-700'>{newerr}</span>}
          {resetMessage && <span className='block text-center text-indigo'>{resetMessage}</span>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover-bg-indigo-700 focus:outline-none"
          >
            Log In
          </button>
        </form>
        <span className="block text-center mt-4">
          Create an Account! <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
