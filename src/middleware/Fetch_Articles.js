import { useState, useEffect } from 'react';

export function useFetchFiles () {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/customer/files')
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

