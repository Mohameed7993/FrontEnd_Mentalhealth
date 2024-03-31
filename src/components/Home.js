import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Home = () => (
    <div className="  dark:bg-gray-900">
        <div className="  p-4 text-black py-20 px-4 text-center ">
            <h1 className="text-4xl font-bold mb-4  dark:text-white">Welcome to Our Mental Health Support App</h1>
            <p className="text-lg dark:text-white">Your source for self-help guides, stress management tools, and professional help connections.</p>
            <a href="#content" className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">Learn More</a>

            <div className="flex space-x-5 items-end mt-8">
            <a href="/login" className="no-underline bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded" id="logintitle1">Login</a>
            <a href="/signup" className="no-underline bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded" id="signuptitle1">Sign Up</a>
            </div>
        </div>

        {/* <!-- Features Section --> */}
        <div className=" py-12 px-4  text-center" id="content">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-blue-100 border border-blue-300 text-left p-5 rounded-lg ">
                    <i className="fas fa-book-open text-4xl text-blue-500 mb-4"></i>
                    <h3 className="text-xl font-bold mb-2 ">Self-Help Guides</h3>
                    <p>Access a library of self-help resources to aid in your mental wellness journey.</p>
                </div>
                <div className="bg-blue-100 border border-blue-300 text-left p-5 rounded-lg">
                    <i className="fas fa-heartbeat text-4xl text-green-500 mb-4"></i>
                    <h3 className="text-xl font-bold mb-2">Stress Management Tools</h3>
                    <p>Utilize tools and techniques to manage stress and promote relaxation.</p>
                </div>
                <div className="bg-blue-100 border border-blue-300 text-left p-5 rounded-lg">
                    <i className="fas fa-user-md text-4xl text-red-500 mb-4"></i>
                    <h3 className="text-xl font-bold mb-2">Professional Help Connections</h3>
                    <p>Connect with mental health professionals for personalized support and guidance.</p>
                </div>
            </div>
        </div>

        {/* <!-- Self-Help Resources --> */}
        <div className=" py-12 px-4">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Self-Help Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-green-200 border border-green-300 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Breathing Exercises</h3>
                    <p>Learn simple yet effective breathing techniques to reduce stress and anxiety.</p>
                    <a href="https://www.healthline.com/health/breathing-exercise#belly-breathing" target="_blank" className="text-blue-500 hover:underline">Explore</a>
                </div>
                <div className=" bg-green-200 border border-green-300 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Mindfulness Meditation</h3>
                    <p>Practice mindfulness meditation to cultivate present-moment awareness and calmness.</p>
                    <a href="https://www.mindful.org/meditation/mindfulness-getting-started/" target="_blank" className="text-green-500 hover:underline">Explore</a>
                </div>
                <div className=" bg-green-200 border border-green-300 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Journaling Prompts</h3>
                    <p>Unlock your thoughts and emotions through guided journaling prompts for self-reflection.</p>
                    <a href="https://psychcentral.com/blog/ready-set-journal-64-journaling-prompts-for-self-discovery" target="_blank" className="text-red-500 hover:underline">Explore</a>
                </div>
            </div>
        </div>

        {/* <!-- Call-to-Action Section --> */}
        <div className=" py-12 px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Ready to Take Control of Your Mental Health?</h2>
            <p className="mb-6 dark:text-white">Download our app now and start your journey towards improved mental wellness.</p>
            <a href="#" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded">Comming soon!!</a>
        </div>
    </div>
);

export default Home;
