import React, { useState } from 'react';

const AddVideoExercise = ({ isOpen, onClose, onSubmit }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [exerciseName, setExerciseName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [how_to_do,setHow_to_do]=useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // prevent submitting traditionally

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('exerciseName', exerciseName);
    formData.append('description', description);
    formData.append('level', level);
    formData.append('how_to_do',how_to_do);

    const response = await fetch("http://localhost:5000/customer/uploadnewvideo", {
      method: 'POST',
      body: formData, // Pass formData directly
    });

    if (response.ok) {
      // Handle success
      const result = await response.json();
      console.log(result);
      onSubmit(result); // Call the onSubmit prop function after successful upload
     // onClose(); // Close the form/modal after submission
    } else {
      // Handle error
      console.error("Video upload failed");
    }
  };

  const handleClose = () => {
    // clearing all the inputs fileds!
    setVideoFile(null);
    setExerciseName('');
    setDescription('');
    setLevel('');
    onClose(); //calling onclose from the parent components! 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-lg font-semibold mb-4">Add New Video Exercise</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label  className="block text-sm font-medium text-gray-700">
              Video File
            </label>
            <input
              type="file"
              id="video"
              name="video"
              className="mt-1 p-2 w-full border rounded-md bg-slate-300"
              onChange={(e) => setVideoFile(e.target.files[0])}
              accept="video/*" // Accept all video formats
              required
            />
          </div>
          <div className="mb-4">
            <label  className="block text-sm font-medium text-gray-700">
              Exercise Name
            </label>
            <input
              type="text"
              id="exerciseName"
              className="mt-1 p-2 w-full border rounded-md bg-slate-300"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              How To Do
            </label>
            <textarea
              id="how_to_do"
              className="mt-1 p-2 w-full border rounded-md bg-slate-300"
              value={how_to_do}
              onChange={(e) => setHow_to_do(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              className="mt-1 p-2 w-full border rounded-md bg-slate-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label  className="block text-sm font-medium text-gray-700">
              Level
            </label>
            <input
              type="number"
              id="level"
              className="mt-1 p-2 w-full border rounded-md bg-slate-300"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={handleClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              Add Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideoExercise;
