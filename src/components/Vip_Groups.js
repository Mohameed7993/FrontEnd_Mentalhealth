import React, { useState, useEffect } from "react";
import backgroundImageUrl from "../images/mentalheltharticlaimage.jpg";

const ComingSoon = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);


  useEffect(() => {
    // Directly select the element by ID and modify its class
    const useraction = document.getElementById('userActions');
    const defaultaction = document.getElementById('default');
   

    if (useraction) {
        useraction.classList.remove('hidden');
    }
 
  if (defaultaction) {
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

  // Determine if the screen is small
  const isSmallScreen = windowSize < 640; // Example breakpoint for "small" screen

  return (
    <div
      className={`h-screen ${isSmallScreen ? "bg-contain" : "bg-cover"} bg-center relative text-white font-mono text-2xl`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute top-0 text-gray-900 left-4">
        <p>Mental Health Team Support</p>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-5xl text-gray-900">COMING SOON</h1>
        <hr className="mx-auto w-1/4" />
        <p>35 days left</p>
      </div>
      <div className="absolute bottom-0 left-4 text-gray-900">
        <p>Stay tuned for updates</p>
      </div>
    </div>
  );
};

export default ComingSoon;
