import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState("PLAYER");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      validateForm(); // Validate form before submission
      setLoading(true);

      // Set user type based on radio button value
      const userTypeValue = userType === 'PLAYER' ? 'PLAYER' : 'TRAINER';

      // Modify the formData to include the email as the username
      const formDataWithEmailAsUsername = {
        ...formData,
        userName: formData.email, // Using email as the username
        userType: userTypeValue
      };

      const response = await axios.post('http://localhost:9000/api/v1/users/create', formDataWithEmailAsUsername);

      console.log(response.data);
      
      // Redirect based on user type
      window.location.href = '/';
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Form validation function
  const validateForm = () => {
    if (!formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.dob.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()) {
      throw new Error('Please fill in all fields');
    }

    if (formData.password !== formData.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Invalid email format');
    }
  };

  // Toggles password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggles confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handles user type change
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  return (
    <>
      <div className="bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/src/assets/background.jpg')"}}>
        <div className="min-h-screen flex justify-center items-center ">
          <div className="bg-rgba-36-40-51-1 p-6 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
            <h1 className="lg:text-3xl md:text-xl font-custom text-white font-bold mb-3 text-center">
              {userType === "PLAYER" ? "PLAYER REGISTRATION" : "TRAINER REGISTRATION"}
            </h1>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-5 flex justify-center">
                <label className="inline-flex items-center">
                  <input type="radio" className="form-radio h-4 w-4 text-blue-600" name="userType" value="PLAYER" checked={userType === "PLAYER"} onChange={() => handleUserTypeChange("PLAYER")} />
                  <span className="ml-2 text-white">Player</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input type="radio" className="form-radio h-4 w-4 text-blue-600" name="userType" value="TRAINER" checked={userType === "TRAINER"} onChange={() => handleUserTypeChange("TRAINER")} />
                  <span className="ml-2 text-white">Trainer</span>
                </label>
              </div>
              <div className="mb-5 flex flex-col lg:flex-row gap-5">
                <input name="firstName" value={formData.firstName} onChange={handleChange} className="border rounded-xl w-full lg:w-1/2 placeholder-white placeholder-opacity-70 hover:ring-gray-400 font-custom font-light text-md py-2 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1" id="firstname" type="text" placeholder="First Name" autoComplete="given-name" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} className="border rounded-xl w-full lg:w-1/2 placeholder-white placeholder-opacity-70 hover:ring-gray-400 font-custom font-light text-md py-2 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1" id="lastname" type="text" placeholder="Last Name" autoComplete="family-name" />
              </div>
              <div className="mb-5">
                <input name="dob" value={formData.dob} onChange={handleChange} className="border rounded-xl w-full placeholder-white placeholder-opacity-70 hover:ring-gray-400 font-custom font-light text-md py-2 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1" id="dob" type="text" placeholder="Birth Date" autoComplete="bob" />
              </div>
              <div className="mb-5">
                <input name="email" value={formData.email} onChange={handleChange} className="border rounded-xl w-full placeholder-white placeholder-opacity-70 hover:ring-gray-400 font-custom font-light text-md py-2 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1" id="email" type="email" placeholder="Email" autoComplete="email" />
              </div>
              <div className="mb-5">
                <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="border rounded-xl w-full placeholder-white placeholder-opacity-70 hover:ring-gray-400 font-custom font-light text-md py-2 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1" id="phonenumber" type="text" placeholder="Phone Number" autoComplete="tel" />
              </div>
              <div className="mb-5 flex gap-5 relative">
                <input name="password" value={formData.password} onChange={handleChange} className="border rounded-xl w-full placeholder-white placeholder-opacity-70 hover:ring-gray-400 font-custom font-light text-md py-2 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1" id="password" type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="new-password" />
                <span className="absolute right-3 top-3">
                  {showPassword ? (
                    <AiOutlineEyeInvisible onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  ) : (
                    <AiOutlineEye onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  )}
                </span>
              </div>
              <div className="mb-5 flex gap-5 relative">
                <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="border rounded-xl w-full placeholder-white placeholder-opacity-70 hover:ring-gray-400 font-custom font-light text-md py-2 px-3 text-white ring-1 focus:outline-none ring-inset ring-rgba-239-246-255-1 bg-rgba-36-40-51-1" id="confirmpassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" autoComplete="new-password" />
                <span className="absolute right-3 top-3">
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible onClick={toggleConfirmPasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  ) : (
                    <AiOutlineEye onClick={toggleConfirmPasswordVisibility} className="text-gray-400 cursor-pointer" size={20} />
                  )}
                </span>
              </div>
              {loading && <p className="text-gray-400 text-sm mb-3">Loading...</p>}
              {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}
              <div className="mb-1 mt-6">
                <button className="bg-white hover:bg-blue-700 shadow-sm font-custom hover:text-white w-full text-rgba-36-40-51-1 text-lg font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline" type="submit">
                  Register Now
                </button>
              </div>
              <div className="mt-3 flex text-center justify-center gap-2">
                <p className="text-xs text-gray-400 font-normal">Already have an account?</p>
                <Link to="/" className="text-xs font-normal text-blue-400 hover:text-white">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
