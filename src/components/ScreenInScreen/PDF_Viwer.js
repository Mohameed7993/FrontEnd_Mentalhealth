import React, { useEffect, useState } from 'react';

const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';
const PdfViewer = ({ isOpen, pdfFileID, onClose }) => {
  const [pdfContent, setPdfContent] = useState(null);

  useEffect(() => {
    // Function to fetch and set PDF content
    const fetchPdf = async () => {
      if (pdfFileID) {
        try {
          const response = await fetch(`${BACKEND_URLCON}/customer/files/${pdfFileID}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const arrayBuffer = await response.arrayBuffer();
          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(blob);
          setPdfContent(pdfUrl); // Update state with the blob URL
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      }
    };

    fetchPdf();

    // Cleanup function to revoke the object URL
    return () => {
      if (pdfContent) {
        URL.revokeObjectURL(pdfContent);
      }
    };
  }, [pdfFileID]); // Depend only on pdfFileID to re-fetch when it changes

  const handleClose = () => {
    onClose(); // Call the onClose prop to handle closing
    if (pdfContent) {
      URL.revokeObjectURL(pdfContent);
      setPdfContent(null);
    }
  };

  if (!isOpen || !pdfFileID || !pdfContent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/3 lg:w-2/3">
        <h2 className="text-lg font-semibold mb-4">PDF Document</h2>
        {/* PDF Viewer */}
        <div className="mb-4">
          <iframe
            src={pdfContent}
            frameBorder="0"
            scrolling="auto"
            height="650px"
            width="100%"
          ></iframe>
        </div>
        <div className="flex justify-between">
          <button onClick={handleClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
