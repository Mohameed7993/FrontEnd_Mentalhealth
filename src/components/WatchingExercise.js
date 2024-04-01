import React, { useEffect, useState } from 'react';

const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';

const ExerciseWatching = ({ isOpen, VideoID, onClose, videoName, videoHowtodo }) => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (VideoID) {
        try {
          const response = await fetch(`${BACKEND_URLCON}/customer/videos/${VideoID}`);
          if (!response.ok) {
            throw new Error('Fetching video failed!');
          }
          const arrayBuffer = await response.arrayBuffer();
          const blob = new Blob([arrayBuffer], { type: 'video/mp4' });
          const videoUrl = URL.createObjectURL(blob);
          setVideoUrl(videoUrl);
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      }
    };

    fetchVideo();

    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
        setVideoUrl(null);
      }
    };
  }, [VideoID]);

  const handleClose = () => {
    onClose();
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl(null);
    }
  };

  if (!isOpen || !VideoID || !videoUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
    <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-3xl m-4">
      {/* Other Modal Content */}
      <div className="mb-4 md:mb-0 md:flex-1">
        <video src={videoUrl} controls className="w-full max-h-96" autoPlay muted />
      </div>
      <div className="md:flex-1 p-5">
        <h2 className="text-lg font-semibold mb-4">{videoName}</h2>
        <p>{videoHowtodo}</p>
      </div>
      {/* Close Button at the bottom left of the modal */}
      <div className="absolute bottom-0 left-0 m-4">
        <button onClick={handleClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  </div>
  );
};

export default ExerciseWatching;
