import React, { useEffect, useState } from 'react';
import { useFetchVideos } from '../middleware/Fetch_Videos';

const ExerciseWatching = ({ isOpen, VideoID, onClose, videoName, videoHowtodo }) => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (VideoID) {
        try {
          const response = await fetch(`http://localhost:5000/customer/videos/${VideoID}`);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-row w-3/4 md:w-3/4 lg:w-3/4">
        {/* Close Button at the left side of the modal */}
        
        {/* Video Player */}
        <div className="flex-1">
          <video src={videoUrl} controls className="w-full max-h-96" autoPlay muted />
        </div>
        {/* How to do / Description */}
        <div className="flex-1 p-5">
          <h2 className="text-lg font-semibold mb-4">{videoName}</h2>
          <p>{videoHowtodo}</p>
        </div>
        <div className="absolute top-0 left-0 m-4">
          <button onClick={handleClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseWatching;
