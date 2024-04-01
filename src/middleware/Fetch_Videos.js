import { useState, useEffect } from 'react';
const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';

export function useFetchVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URLCON}/customer/videos`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setVideos(data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return { videos };
};
