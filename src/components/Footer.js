import React from 'react';
import '../styles/tailwind.css'; // Make sure to import your Tailwind CSS styles

const Footer = () => {
  return (
  
    <div className="p-4 text-center bg-gray-900 dark:bg-white  text-white dark:text-gray-900 my-[auto]">
    <div className="max-w-md mx-auto dark:text-slate-900">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">For any inquiries or support, please feel free to reach out to us.</p>
        <p>Email: MentalHealthSupport@example.com</p>
    </div>
  </div>

    
  );
}

export default Footer;
