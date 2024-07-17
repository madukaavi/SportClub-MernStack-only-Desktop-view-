import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from React Router
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Importing eye icons from React Icons

function ResetPassword () {
  const history = useHistory(); // Initialize useHistory hook
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleResetPassword = () => {
    // Validation checks
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Axios POST request to reset password
    axios.post('http://localhost:9000/api/v1/admin/reset-password', { newPassword }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      alert('Password reset successfully');
      history.push('/login'); // Redirect to login page after successful reset
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to reset password');
    });
  };

  return (
    <>
      {/* Reset-Password-Main-Area */}
      <div className="bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/src/assets/background.jpg')" }}>
        <div className="h-screen flex justify-center items-center">
          <div className="bg-rgba-36-40-51-1 mx-4 p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">

            {/* Reset-main-text-section */}
            <h1 className="text-4xl text-white font-bold mb-6 text-center font-custom">Reset Password !</h1>
            <p className='flex items-center text-xs text-gray-400 font-custom'>Enter your new password below.</p>

            {/* Reset-password-form-unit */}
            <form className='mt-4'>

              {/* New-Password-field */}
              <div className="mb-5 relative">
                <input
                  className="border rounded-xl w-full lg:w-full md:w-full placeholder-white placeholder:text-white hover:ring-gray-400 text-custom-16 font-custom font-light placeholder-opacity-60 py-3 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                {/* New Password visibility toggle icon */}
                <span className="absolute right-3 top-3">
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible onClick={toggleNewPasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  ) : (
                    <AiOutlineEye onClick={toggleNewPasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  )}
                </span>
              </div>

              {/* Confirmation-Password-Retype-area */}
              <div className="mb-5 relative">
                <input
                  className="border rounded-xl w-full lg:w-full md:w-full hover:ring-gray-400 placeholder-white placeholder:text-white text-custom-16 font-custom font-light placeholder-opacity-60 py-3 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                {/* Confirm Password visibility toggle icon */}
                <span className="absolute right-3 top-3">
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible onClick={toggleConfirmPasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  ) : (
                    <AiOutlineEye onClick={toggleConfirmPasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  )}
                </span>
              </div>

              {/* Reset-New-Password-Button */}
              <div className="mb-2 mt-6">
                <button className="bg-white hover:bg-blue-800 shadow-sm flex hover:text-white w-full text-rgba-36-40-51-1 text-lg font-custom font-semibold py-3 justify-center gap-4 items-center px-4 rounded-md focus:outline-none focus:shadow-outline" type="button" onClick={handleResetPassword}>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
