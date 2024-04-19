import React, { useState } from 'react';

const EditBroadcastLink = ({ isOpen, onClose, onSubmit }) => {
  const [url, setBroadcastLink] = useState(''); // Initialize with empty string or existing link

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting traditionally
    onSubmit({ url });
  };

  const handleClose = () => {
    setBroadcastLink(''); // Clear the input
    onClose(); // Call the passed onClose function
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-lg font-semibold mb-4">Edit Your Broadcast Link</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="broadcastLink" className="block text-sm font-medium  text-gray-700">
              Broadcast URL
            </label>
            <input
              type="url"
              id="broadcastLink"
              className="mt-1 p-2 w-full border rounded-md bg-slate-300"
              placeholder="https://example.com/your-broadcast"
              value={url}
              onChange={(e) => setBroadcastLink(e.target.value)}
              pattern="https?://.*"
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={handleClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              Update Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBroadcastLink;
