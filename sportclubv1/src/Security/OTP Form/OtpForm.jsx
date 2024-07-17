import React, { useState } from 'react';
import axios from 'axios';

const OTPForm = () => {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('');

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(
        userType === 'ADMIN' 
          ? 'http://localhost:9000/api/v1/api/v1/admin/submit-otp' 
          : 'http://localhost:9000/api/v1/users/submit-otp', 
        { otp }
      );

      if (response.data.success) {
        let redirectUrl = '';
        switch (response.data.userType) {
          case 'PLAYER':
            redirectUrl = '/Resetpassword';
            break;
          case 'TRAINER':
            redirectUrl = '/ResetPassword';
            break;
          case 'ADMIN':
            redirectUrl = '/ResetPassword';
            break;
          default:
            redirectUrl = '/login'; // Default redirect URL
        }
        window.location.href = redirectUrl;
      } else {
        setError('Invalid OTP. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Error verifying OTP. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/src/assets/background.jpg')"}}>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-8 pt-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
            Enter OTP
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id="otp"
            type="number"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-rgba-36-40-51-1 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPForm;
