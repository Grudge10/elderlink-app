import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  // Placeholder data - replace with actual data fetching
  const userType = 'senior'; // Or 'volunteer' - determine based on currentUser data
  const connections = [
    { name: 'Sarah Thompson', interests: ['Reading', 'Gardening'] },
    { name: 'Robert Johnson', interests: ['History', 'Music'], needsHelp: ['Technology Support'] },
  ];
  const upcomingCalls = [
    { user: 'Sarah', time: 'Tuesday, March 4, 2025 • 2:00 PM' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="bg-blue-700 text-white p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ElderLink Dashboard</h1>
        <div className="flex items-center">
          <span className="mr-4">{currentUser?.name}</span>
          <button className="bg-white text-blue-700 px-3 py-1 rounded" onClick={logout}>Sign Out</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              {userType === 'senior' ? 'Your Connections' : 'Seniors You Support'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.map((connection, index) => (
                <div key={index} className="border p-4 rounded-lg flex items-center">
                  <img src="/api/placeholder/60/60" alt="placeholder" className="rounded-full mr-4" />
                  <div>
                    <h3 className="font-bold">{connection.name}</h3>
                    <p className="text-sm text-gray-600">Interests: {connection.interests.join(', ')}</p>
                    {connection.needsHelp && (
                      <p className="text-sm text-gray-600">Needs help with: {connection.needsHelp.join(', ')}</p>
                    )}
                    <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm">Start Video Call</button>
                  </div>
                </div>
              ))}

              <div className="border border-dashed p-4 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-3xl text-gray-400 mb-2">+</span>
                  <span className="text-blue-600">Find More Connections</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Upcoming Calls</h2>

            <div className="border-b pb-4 mb-4">
              {upcomingCalls.map((call, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <h3 className="font-bold">
                      {userType === 'senior' ? `Call with ${call.user}` : `Call with ${call.user}`}
                    </h3>
                    <p className="text-gray-600">{call.time}</p>
                  </div>
                  <div>
                    <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Join</button>
                    <button className="border border-gray-300 px-3 py-1 rounded">Reschedule</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">
                Schedule New Call
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Resources</h2>
            
            <ul className="space-y-3">
              <li>
                <a href="#!" className="text-blue-600 hover:underline flex items-center">
                  <span className="mr-2">📖</span> How to use video calls
                </a>
              </li>
              <li>
                <a href="#!" className="text-blue-600 hover:underline flex items-center">
                  <span className="mr-2">💬</span> Conversation starters
                </a>
              </li>
              <li>
                <a href="#!" className="text-blue-600 hover:underline flex items-center">
                  <span className="mr-2">🛠️</span> Troubleshooting connection issues
                </a>
              </li>
              <li>
                <a href="#!" className="text-blue-600 hover:underline flex items-center">
                  <span className="mr-2">🏠</span> Virtual activities to do together
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Your Profile</h2>
            
            <div className="flex items-center mb-4">
              <img src="/api/placeholder/80/80" alt="placeholder" className="rounded-full mr-4" />
              <div>
                <h3 className="font-bold">{currentUser?.name}</h3>
                <p className="text-gray-600">{userType === 'senior' ? 'Senior Member' : 'Volunteer'}</p>
              </div>
            </div>
            
            {/* Placeholder content - replace with dynamic data from ProfileContext */}
            <div className="mb-3">
              <h4 className="font-bold mb-1">Interests</h4>
              <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Reading</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Gardening</span>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="font-bold mb-1">Availability</h4>
              <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Weekday Mornings</span>
              </div>
            </div>

            <button className="w-full mt-4 border border-gray-300 rounded py-2">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
