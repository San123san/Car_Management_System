import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Both email and password are required.');
      return;
    }

    try {
      const response = await axios.post('https://car-management-system-fyne-assessment.onrender.com/api/v1/users/register', {
        email,
        password
      });

      if (response.status === 201) {
        console.log('User signed up successfully', response.data);

        setSuccessMessage('You have created an account successfully!');

        setTimeout(() => {
          navigate('/sign-in'); 
        }, 3000);
      }
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);

      if (error.response?.status === 400) {
        setErrorMessage('Both email and password are required.');
      } else if (error.response?.status === 409) {
        setErrorMessage('A user with this email already exists.');
      } else if (error.response?.status === 500) {
        setErrorMessage('Something went wrong. Please try again later.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <button
          onClick={handleCancel}
          className="text-sm text-red-500 hover:underline"
        >
          Close
        </button>
      </div>

      {successMessage && (
        <div className="mb-4 text-green-500 text-sm">
          <p>{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 text-red-500 text-sm">
          <p>{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-center">
        <p>Already have an account? 
          <a href="/sign-in" className="text-blue-500 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
