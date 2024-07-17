import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';


function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in both email and password fields');
      return;
    }

    setIsLoading(true); // Set loading to true when login starts

    try {
      const response = await axios.post('http://localhost:9000/api/v1/admin/login', { email, password });
      // Assuming successful login redirects to admin dashboard
      if (response.status === 200) {
        // Simulate loading for 2 seconds before redirecting
        setTimeout(() => {
          window.location.href = '/AdminDashboard';
        }, 3000);
      }
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false); // Set loading to false after login attempt
    }
  };

  return (
    <>
      <div className="bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/src/assets/background.jpg')"}}>
        <div className="h-screen flex justify-center items-center">
          <div className="bg-rgba-36-40-51-1 mx-4 p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-3xl text-white font-custom font-bold mb-8 text-center">ADMIN LOGIN</h1>
            <form className='mt-8'>
              <div className="mb-5 flex">
                <input
                  className="border rounded-xl w-full lg:w-full md:w-full placeholder-white placeholder:text-white placeholder-opacity-60 hover:ring-gray-400 font-custom text-md font-light py-3 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1"
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </div>
              <div className="mb-1 flex relative">
                <input
                  className="border rounded-xl w-full lg:w-full md:w-full placeholder-white placeholder:text-white placeholder-opacity-60 hover:ring-gray-400 font-custom text-md font-light py-3 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1"
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <span className="absolute right-3 top-4">
                  {showPassword ? (
                    <AiOutlineEyeInvisible onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  ) : (
                    <AiOutlineEye onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  )}
                </span>
              </div>
              <div className="flex text-right mt-2">
              <Link to="/ForgotPassword" className="text-gray-400 font-normal text-xs font-custom hover:text-gray-100">Forgot your password?</Link>
              </div>
              {error && <div className="text-red-500 mb-3">{error}</div>}
              <div className="mb-4 mt-5">
                <button onClick={handleLogin} className="bg-red-600 hover:text-gray-100 hover:bg-red-400 font-custom shadow-sm w-full text-white text-xl font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline" type="button">
                  {isLoading ? 'Loading...' : 'Login'} {/* Show Loading text if loading, otherwise Login */}
                </button>
              </div>
              <div className="flex items-center justify-center gap-1">
              <p className='text-xs text-gray-300 font-custom font-normal'>Don’t have an account yet?</p>
              <Link to="/AdminRegister" className="text-xs font-normal font-custom text-blue-400 hover:text-gray-300">Sign up now</Link>
              </div>
            </form>
          </div>   
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
