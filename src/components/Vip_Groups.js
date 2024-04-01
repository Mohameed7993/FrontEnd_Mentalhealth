  import React, { useState, useEffect } from "react";
  import backgroundImageUrl from "../images/mentalheltharticlaimage.jpg";
  
  const ComingSoon = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
  
    useEffect(() => {
      // Directly select the element by ID and modify its class
      const useraction = document.getElementById('userActions');
      const defaultaction = document.getElementById('default');
     
  
      if (useraction) {
          useraction.classList.remove('md:hidden');
          useraction.classList.remove('hidden');
      }
   
    if (defaultaction) {
      defaultaction.classList.add('md:hidden');
      defaultaction.classList.add('hidden');
    }
    
  }, []);

    useEffect(() => {
      function handleResize() {
        setWindowSize(window.innerWidth);
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const isSmallScreen = windowSize < 640; // Example breakpoint for "small" screen
  
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900">
      <div className="text-center">
        <img src={backgroundImageUrl} alt="Coming Soon" className="mx-auto" />
        <div className="text-gray-900 dark:text-gray-300 font-mono text-2xl">
          <h1 className="text-5xl   mt-4">COMING SOON</h1>
          <hr className="mx-auto w-1/4 mt-4" />
          <p className="dark:text-gray-300 mt-2">35 days left</p>
        </div>
        <p className="absolute bottom-0 left-4 dark:text-gray-300">Stay tuned for updates</p>
      </div>
    </div>
    );
  };
  
  export default ComingSoon;
  
