import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:9000/api/v1/users/login', { email, password });

      if (response.status === 200) {
        const userData = response.data.user;
        if (userData.userType === 'PLAYER') {
          console.log('Redirecting to PlayerDashboard');
          window.location.href = '/PlayerDashboard';
        } else if (userData.userType === 'TRAINER') {
          console.log('Redirecting to TrainerDashboard');
          window.location.href = '/TrainerDashboard';
        } else {
          console.error('Invalid user type:', userData.userType);
          setErrorMessage('Invalid user type: ' + userData.userType);
        }
      } else {
        console.error('Invalid email or password.');
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      setErrorMessage('An error occurred while logging in.');
    }
  };

  return (
    <div className="bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/src/assets/background.jpg')" }}>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-rgba-36-40-51-1 mx-4 p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl text-white font-semibold font-custom mb-8 text-center">LOGIN FORM</h1>
          <form className="mt-8">
            <div className="mb-5 flex">
              <input
                className="border rounded-xl w-full placeholder-white placeholder:text-white placeholder-opacity-60 font-custom text-md font-light py-3 px-3 text-white ring-1 focus:outline-none ring-inset hover:ring-gray-400 ring-rgba-239-246-255-1 bg-rgba-36-40-51-1"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-1 flex relative">
              <input
                className="border rounded-xl w-full placeholder-white placeholder:text-white placeholder-opacity-60 font-custom text-md font-light py-3 px-3 text-white ring-1 focus:outline-none ring-inset hover:ring-gray-400 ring-rgba-239-246-255-1 bg-rgba-36-40-51-1"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute right-3 top-4">
                {showPassword ? (
                  <AiOutlineEyeInvisible onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                ) : (
                  <AiOutlineEye onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                )}
              </span>
            </div>
            <div className="flex text-right mt-2">
              <Link to="/ForgotPassword" className="text-gray-400 font-custom font-normal text-xs hover:text-gray-200">
                Forgot your password?
              </Link>
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <div className="mb-4 mt-5">
              <button
                className="bg-white hover:bg-blue-700 font-custom shadow-sm hover:text-white w-full text-rgba-36-40-51-1 text-xl font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xs font-normal font-custom text-gray-300">New User?</p>
              <Link to="/RegisterForm" className="text-xs font-custom font-normal text-blue-400 hover:text-white">
                Sign up now
              </Link>
              <Link to="/AdminLogin" className="text-xs font-custom ml-1 font-normal text-red-600 hover:text-white">
                Admin Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
