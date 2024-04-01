import React from 'react';
import { useState } from 'react';
import vid from '../images/mentalhelthvideo.mp4'
import {  useNavigate } from 'react-router-dom';
const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';

const SignUp = () => {
  const navigate=useNavigate();

  const [inputs, setInputs] = useState({});

 const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value})) //{username:'mohameed',age:'25'}
  }


  const  handleSubmit = async(event) => {
    event.preventDefault();

    const response =  await fetch(`${BACKEND_URLCON}/customer/signup`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      alert(result.message);

      if(result.type==="success"){
        navigate('/login');
      }
  }

  return (
    <div className="dark:bg-gray-900">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex justify-center items-center w-full max-w-4xl mx-auto">
        <div className="md:w-1/2 w-full my-5 p-8 bg-blue-100 border border-blue-300 rounded-lg shadow-md mb-4 md:mb-0">
            <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>
            <form id="signUpForm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label  className=" block text-sm font-medium text-gray-700">
                  Full Name
                <input
                  type="text"
                  name="fullname"
                  value={inputs.fullname}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  placeholder="Your full name"
                />
                 </label>
              </div>
              <div className="mb-4">
                <label  className="block text-sm font-medium text-gray-700">
                  Username
                
                <input
                  type="text"
                  name="username"
                  value={inputs.username}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  placeholder="Your username"
                />
                </label>
              </div>
              <div className="mb-4">
                <label  className="block text-sm font-medium text-gray-700">
                  Email
               
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  placeholder="Your email"
                />
                </label>
              </div>
              <div className="mb-4">
                <label  className="block text-sm font-medium text-gray-700">
                  Phone Number
               
                <input
                  type="tel"
                  name="phonenumber"
                  value={inputs.phonenumber}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  placeholder="Your phone number"
                />
                </label>
              </div>
              <div className="mb-4">
                <label  className="block text-sm font-medium text-gray-700">
                  Age
               
                <input
                  type="text"
                  name="age"
                  value={inputs.age}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  placeholder="Your Age"
                />
                </label>
              </div>
              <div className="mb-4">
                <label  className="block text-sm font-medium text-gray-700">
                 Location
               
                <input
                  type="text"
                  name="location"
                  value={inputs.location}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  placeholder="Your location"
                />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                
                <input
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  placeholder="Create a password"
                />
                </label>
              </div>
              <div className="mb-4">
                <label  className="block text-sm font-medium text-gray-700">
                  Confirm Password
                
                <input
                  type="password"
                  name="confirmpassword"
                  value={inputs.confirmpassword}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  placeholder="Confirm your password"
                />
                </label>
              </div>
              <button
                id="regis-button"
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
             
            </form>
          </div>

          <div className="w-1/2 flex justify-center items-center p-4">
            <video className="rounded-lg" autoPlay loop muted playsInline>
              <source src={vid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
