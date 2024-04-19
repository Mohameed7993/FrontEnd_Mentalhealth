import React, { useState } from 'react';


const EnterInform = ({ isOpen, onSubmit }) => {
  const [mentalState, setMentalState] = useState(5); // Default value set to 5
  const [anxietyLevel, setAnxietyLevel] = useState(5); // Default value set to 5

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting traditionally
    onSubmit({ mentalState, anxietyLevel });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-lg font-semibold mb-4">Complete your Mental details! Let's check your current states:</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4 ">
            <label htmlFor="mentalState" className="block text-sm font-medium text-gray-700">
              Mental State (0-10)
            </label>
            <input
              type="number"
              id="mentalState"
              className="mt-1 p-2 w-full border rounded-md bg-slate-300"
              value={mentalState}
              onChange={(e) => setMentalState(e.target.value)}
              min="0"
              max="10"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="anxietyLevel" className="block text-sm font-medium text-gray-700">
              Anxiety Level (0-10)
            </label>
            <input
              type="number"
              id="anxietyLevel"
              className="mt-1 p-2 w-full border rounded-md bg-slate-300"
              value={anxietyLevel}
              onChange={(e) => setAnxietyLevel(e.target.value)}
              min="0"
              max="10"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterInform;
