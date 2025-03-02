import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome to ElderLink</h1>
      <p className="text-xl mb-8">Connecting seniors with compassionate volunteers for companionship and assistance through video calls</p>
      
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-lg transition-all"
          onClick={() => navigate('/register?userType=senior')}
        >
          I'm a Senior Seeking Connection
        </button>
        
        <button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-lg transition-all"
          onClick={() => navigate('/register?userType=volunteer')}
        >
          I Want to Volunteer
        </button>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Companionship</h3>
          <p>Regular video chats with friendly volunteers to reduce isolation and build meaningful connections</p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Tech Assistance</h3>
          <p>Get help navigating websites, setting up applications, or troubleshooting technology issues</p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Shared Activities</h3>
          <p>Connect with volunteers who share your interests for engaging conversations and activities</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
