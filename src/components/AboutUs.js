import React from 'react';
import juliaImage from '../images/julia.jpg';
import marysolImage from '../images/marysol.jpg';
import shorokImage from '../images/shorok.jpg';
import mhamdImage from '../images/mhamd.jpg';

// Team Member Component
const TeamMember = ({ image, name, role, description, email }) => (
  <div className="max-w-xs rounded overflow-hidden shadow-lg p-6 flex flex-col items-center">
    <img className="w-full" src={image} alt={name} />
    <div className="px-6 py-4 text-gray-700 dark:text-white">
      <div className="font-bold text-xl mb-2">{name}</div>
      <div className="">{role}</div>
      <div className="">{description}</div>
      <div className="py-4">Email: {email}</div>
    </div>
  </div>
);

const AboutUs = () => {
  // Team Members Data
  const teamMembers = [
    {
      image: mhamdImage,
      name: "Mohameed Egbaria",
      role: "Software Engineering Student",
      description: "Passionate about coding and building scalable applications.",
      email: "software.egbaria@gmail.com"
    },
    {
      image: shorokImage,
      name: "Shorok Heib",
      role: "Information Systems Student",
      description: "Passionate about technology and innovation.",
      email: "Shorok@example.com"
     
    },
    {
      image: marysolImage,
      name: "Marysol Karawany",
      role: "Information Systems Student",
      description: "A creative mind with a passion for design and technology.",
      email: "Marysol@example.com"
    },
    {
      image: juliaImage,
      name: "Julia Shbat",
      role: "Software Engineering Student",
      description: "Passionate about coding and problem-solving.",
      email: "Julia@example.com"
    }
  ];

  return (
    <div className="dark:bg-gray-900">
      {/* Description Section */}
      <div className="about-section text-center py-10">
        <h1 className="text-2xl font-bold dark:text-white">About Our Mental Health App</h1>
        <div className="about-content text-center py-5 ">
          <p className=" dark:text-white text-lg font-bold text-gray-700">We're a team passionate about mental health, creating a Mental Health Support App to make a positive impact.</p>
          <p className="dark:text-white text-lg font-bold text-gray-700">Our app offers a variety of resources, including self-help guides, stress management tools, and connections to professional help.</p>
        </div>
      </div>

      {/* Team Section */}
      <h2 className=" dark:text-white text-3xl font-bold text-center mb-8">Meet Our Team</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map(member => (
          <TeamMember key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
