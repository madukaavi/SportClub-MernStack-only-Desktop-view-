import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Importing eye icons from React Icons
import axios from 'axios'; // Importing Axios for HTTP requests
import { Link } from 'react-router-dom';

function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility
  const [name, setName] = useState(''); // State variable for name input
  const [email, setEmail] = useState(''); // State variable for email input
  const [password, setPassword] = useState(''); // State variable for password input
  const [error, setError] = useState(''); // State variable for error messages
  const [loading, setLoading] = useState(false); // State variable for loading state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    // Check if any required field is empty
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true); // Set loading state to true
      // Send registration data to the backend API
      const response = await axios.post('http://localhost:9000/api/v1/admin/create', { name, email, password });
      // Assuming successful registration redirects to admin login
      if (response.status === 200) {
        window.location.href = '/AdminLogin';
      }
    } catch (error) {
      setError('Registration failed');
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <>
      {/* Register-area-Main */}
      <div className="bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/src/assets/background.jpg')"}}>
        <div className="h-screen flex justify-center items-center ">
          <div className="bg-rgba-36-40-51-1 mx-2 p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
            {/* Register-text-section */}
            <h1 className="text-3xl font-custom text-white font-bold mb-8 text-center">ADMIN REGISTRATION</h1>
            {/* Register-form-unit */}
            <form className="mt-8">
              {/* Name-field */}
              <div className="mb-5 flex">
                <input
                  className="border rounded-xl w-full lg:w-full md:w-full hover:ring-gray-400 placeholder-white placeholder:text-white placeholder-opacity-60 font-custom text-md font-light py-3 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
              {/* Email-field */}
              <div className="mb-5 flex">
                <input
                  className="border rounded-xl w-full lg:w-full md:w-full hover:ring-gray-400 placeholder-white placeholder:text-white placeholder-opacity-60 font-custom text-md font-light py-3 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              {/* Password-field */}
              <div className="mb-1 flex relative">
                <input
                  className="border rounded-xl w-full lg:w-full md:w-full hover:ring-gray-400 placeholder-white placeholder:text-white placeholder-opacity-60 font-custom text-md font-light py-3 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {/* Password visibility toggle icon */}
                <span className="absolute right-3 top-4">
                  {showPassword ? (
                    <AiOutlineEyeInvisible onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  ) : (
                    <AiOutlineEye onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  )}
                </span>
              </div>
              {/* Display error message if there's any */}
              {error && <div className="text-red-500 mb-3">{error}</div>}
              {/* Register-button-section */}
              <div className="mb-4 mt-6">
                {/* Show loading text while loading */}
                {loading ? (
                  <button className="bg-gray-600 cursor-not-allowed opacity-75 font-custom shadow-sm w-full text-white text-lg font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline" type="button">
                    Loading...
                  </button>
                ) : (
                  <button onClick={handleRegister} className="bg-green-600 hover:text-gray-100 font-custom hover:bg-green-400 shadow-sm w-full text-white text-lg font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline" type="button">
                    Register
                  </button>
                )}
              </div>
              {/* Already-registered-area */}
              <div className="flex items-center justify-center gap-1">
              <p className="text-xs font-custom text-gray-400 font-normal">Already have an account?</p>
              <Link to="/AdminLogin" className="text-xs font-custom font-normal text-red-500 hover:text-gray-300">Login here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Register-area-Main */}
    </>
  );
};

export default AdminRegister;
