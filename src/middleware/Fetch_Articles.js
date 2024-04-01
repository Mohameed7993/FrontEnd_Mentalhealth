import { useState, useEffect } from 'react';

const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';

export function useFetchFiles () {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URLCON}/customer/files`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFiles(data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      })
     
  }, []);
  //useFetchFiles();
  return { files };
};

