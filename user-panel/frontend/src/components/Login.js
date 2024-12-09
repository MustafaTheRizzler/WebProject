import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation for email and password
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/auth/login', {
        email,
        password,
      });

      // Store the token in localStorage
      localStorage.setItem('authToken', response.data.token);

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Enter Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button 
            type="submit" 
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
