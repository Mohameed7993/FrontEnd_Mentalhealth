import React from 'react';
import { useState } from "react";
import '../styles/tailwind.css'; 
import vid from '../images/mentalhelthvideo.mp4'
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EnterInform from './ScreenInScreen/Customer_Enter_More_Information'

const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';

const Login = () => {

  const [isfirsttimelogin, setIsFirstTimeUser] = useState(''); // You'll determine this based on your conditions
  const [ShowFrom_EnterInform, setShowFrom_EnterInform] = useState(false);

  const [userRole,setuserRole]=useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [UserId,setUserId]=useState('');
  const navigate=useNavigate();
  const { login } = useAuth();


  const handleModalSubmit = async (data) => {
    setShowFrom_EnterInform(false);
    console.log("Received data from EnterInform:", data);
    proceedAfterEnterInform(userRole);
    const inputs = {isfirsttimelogin};
    

    ///peatch to update the isfirst time:///////
    try {
      const response = await fetch(`${BACKEND_URLCON}/customer/profile`, {
        method: 'PATCH', // Or 'PUT' if your server is set up to use PUT for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserId, inputs }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user details');
      }

      const result = await response.json();

      if(result.type==='error'){
          alert("Faild Updating details!: "+result.message);
      }
      else{
          alert("you'r registration had finished! successfully! ");  
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }

    
    // ///// post to set the inputs!////
    try {
      const response = await fetch(`${BACKEND_URLCON}/customer/addmoreinform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({UserId,data}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user details or check password');
      }
      const result = await response.json();
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };


  const proceedAfterEnterInform = (role) => {
    switch(role) {
      case 1: // Role 1, e.g., Customer
        navigate('/customers');
        break;
      case 10: // Role 10, e.g., Admin or Master
        navigate('/master');
        break;
      // Add more cases as needed for other roles
      default:
        navigate('/defaultPage'); // Fallback or default navigation
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${BACKEND_URLCON}/customer/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user details or check password');
      }
      const result = await response.json();
      if(result.type==='error'){
        alert('Login failed: ' + result.message);
      }
      else{
        login(result.user);
        setuserRole(result.user.role);
        setIsFirstTimeUser(false);
        setUserId(result.user._id);

        if (result.user.isfirsttimelogin) {
          setShowFrom_EnterInform(true);
        }
        else{
          proceedAfterEnterInform(result.user.role);
        }
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };



  return (

    <>
  <div className="dark:bg-gray-900 flex items-center justify-center min-h-screen">
    <div className="flex flex-wrap justify-center items-center p-4 w-full lg:w-1/2">
      <div className="w-full lg:w-1/2 p-8 bg-blue-100 border border-blue-300 rounded-lg shadow-md my-auto mx-0">
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            id="submitButton"
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log in
          </button>
        </form>

        {ShowFrom_EnterInform && (
          <EnterInform
            isOpen={ShowFrom_EnterInform}
            onSubmit={handleModalSubmit}
          />)}

      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
        <video className="max-w-full h-auto rounded-lg" autoPlay loop muted playsInline>
          <source src={vid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</>

  );
};

export default Login;
