import React, { useState } from 'react';

const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';


const AddPdfDocument = ({ isOpen, onClose, onSubmit }) => {
    console.log(isOpen)
  const [pdfFile, setPdfFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');

  const handleFormSubmit =async  (e) => {
    e.preventDefault(); // Prevent the form from submitting traditionally

    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('documentName', documentName);
    formData.append('description', description);
    formData.append('level', level);

     // Don't set the Content-Type header manually
     console.log(formData)
  const response = await fetch(`${BACKEND_URLCON}/customer/uploadnewfile`, {
    method: 'POST',
    body: formData, // Pass formData directly
  });

  if (response.ok) {
    // Handle success
    const result = await response.json();
    console.log(result);
    // Additional success handling
    onClose(); // Assuming you have an onClose method to close the form/modal
  } else {
    // Handle error
    console.error("File upload failed");
  }
  onSubmit(formData);

     
  };

  
  const handleClose = () => {
    // Clear the inputs
    setPdfFile(null);
    setDocumentName('');
    setDescription('');
    setLevel('');
    onClose(); // Call the passed onClose function
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-lg font-semibold mb-4">Add New PDF Document</h2>
        <form enctype="multipart/form-data" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700">
              PDF File
            </label>
            <input
              type="file"
              id="file"
              className="mt-1 p-2 w-full border rounded-md bg-slate-300"
              onChange={(e) => setPdfFile(e.target.files[0])}
              accept=".pdf"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="documentName" className="block text-sm font-medium text-gray-700">
              Document Name
            </label>
            <input
              type="text"
              id="documentName"
              className="mt-1 p-2 w-full border rounded-md bg-slate-300"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
              Level
            </label>
            <input
              type="text"
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
              Add Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPdfDocument;


