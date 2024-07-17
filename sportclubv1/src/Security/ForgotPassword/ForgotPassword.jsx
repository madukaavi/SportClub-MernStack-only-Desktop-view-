import React, { useState } from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import { Link } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    try {
      // Make API request to send new password
      const response = await axios.post('https://localhost:9000/api/v1/admin/forgot-password', { email });
      setSuccess(response.data.message);

      // Redirect to OTP form
      // Assuming the response contains a boolean indicating if OTP was sent successfully
      if (response.data.success) {
        window.location.href = '/otp-form'; // Replace with your OTP form route
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <div className="bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/src/assets/background.jpg')"}}>
        <div className="h-screen flex justify-center items-center">
          <div className="bg-gradient-to-r from-white to-white mx-2  p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
            <h1 className="lg:text-4xl text-2xl  text-rgba-36-40-51-1 font-bold mb-2 text-center font-custom">Forgot Password ?</h1>
            <p className=' flex items-center text-[9px]  lg:text-custom-11 text-gray-400 mt-2 font-custom'>Please enter your email address. You will receive a new password via email.</p>

            <form onSubmit={handleSubmit} className='mt-4'>
              <div className="mb-5">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-xl w-full lg:w-full md:w-full placeholder-rgba-36-40-51-1 placeholder-opacity-60 font-custom hover:ring-text-gray-400   py-3 px-3 text-rgba-36-40-51-1 ring-1 text-custom-16 focus:outline-none ring-inset ring-rgba-36-40-51-1 bg-white"
                  id="email" type="email" placeholder="Enter Your Email Address" />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <div className="mb-2 mt-6">
                <button className="bg-rgba-36-40-51-1 hover:bg-blue-800 shadow-sm flex hover:text-white w-full text-white text-lg font-custom font-normal py-2 justify-center gap-4 items-center px-4 rounded-md focus:outline-none focus:shadow-outline" type="submit">
                  Get New Password<IoIosArrowRoundForward className='fill-white w-8 h-8' />
                </button>
              </div>

              <div className="mt-9 flex justify-center items-center">
              <p className='text-rgba-36-40-51-1 text-sm flex gap-2 font-custom justify-center items-center'>
              <CiLogout className='fill-rgba-36-40-51-1 w-5 h-5 hover:fill-blue-500 cursor-pointer' />
              <Link to="/" className="hover:text-blue-500">Back To Login</Link>
               </p>
              </div>
              <div className="mt-2 flex justify-center items-center">
              <p className='text-rgba-36-40-51-1 text-sm flex gap-2 font-custom justify-center items-center'>
              <CiLogout className='fill-rgba-36-40-51-1 w-5 h-5 hover:fill-blue-500 cursor-pointer' />
              <Link to="/AdminLogin" className="hover:text-blue-500">Back To Admin Login</Link>
             </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
