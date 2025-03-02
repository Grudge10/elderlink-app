import React, { useState } from 'react';

const ElderLink = () => {
  const [userType, setUserType] = useState(null);
  const [step, setStep] = useState('welcome');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: [],
    availability: [],
    needsHelp: []
  });

  // Common interests for matching
  const interestOptions = [
    'Reading', 'Gardening', 'Cooking', 'Music', 'Arts & Crafts', 
    'History', 'Travel', 'Technology', 'Sports', 'Movies'
  ];

  // Time slots for availability
  const timeSlots = [
    'Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings',
    'Weekend Mornings', 'Weekend Afternoons', 'Weekend Evenings'
  ];

  // Help categories seniors might need
  const helpCategories = [
    'Technology Support', 'Companionship', 'Reading Assistance',
    'App Navigation', 'Medical Portal Help', 'Online Shopping'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (field, value) => {
    if (formData[field].includes(value)) {
      setFormData({
        ...formData,
        [field]: formData[field].filter(item => item !== value)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], value]
      });
    }
  };

  const renderWelcome = () => (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome to ElderLink</h1>
      <p className="text-xl mb-8">Connecting seniors with compassionate volunteers for companionship and assistance through video calls</p>
      
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-lg transition-all"
          onClick={() => {
            setUserType('senior');
            setStep('register');
          }}
        >
          I'm a Senior Seeking Connection
        </button>
        
        <button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-lg transition-all"
          onClick={() => {
            setUserType('volunteer');
            setStep('register');
          }}
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

  const renderRegistrationForm = () => (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        {userType === 'senior' ? 'Senior Registration' : 'Volunteer Registration'}
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Interests (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {interestOptions.map(interest => (
              <div key={interest} className="flex items-center">
                <input
                  type="checkbox"
                  id={`interest-${interest}`}
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleCheckboxChange('interests', interest)}
                  className="mr-2"
                />
                <label htmlFor={`interest-${interest}`}>{interest}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Availability
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map(slot => (
              <div key={slot} className="flex items-center">
                <input
                  type="checkbox"
                  id={`time-${slot}`}
                  checked={formData.availability.includes(slot)}
                  onChange={() => handleCheckboxChange('availability', slot)}
                  className="mr-2"
                />
                <label htmlFor={`time-${slot}`}>{slot}</label>
              </div>
            ))}
          </div>
        </div>
        
        {userType === 'senior' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              I Need Help With (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {helpCategories.map(category => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`help-${category}`}
                    checked={formData.needsHelp.includes(category)}
                    onChange={() => handleCheckboxChange('needsHelp', category)}
                    className="mr-2"
                  />
                  <label htmlFor={`help-${category}`}>{category}</label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-6">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setStep('welcome')}
          >
            Back
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setStep('confirmation')}
          >
            Submit Registration
          </button>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="bg-green-50 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Registration Complete!</h1>
        
        <p className="text-xl mb-6">
          Thank you for joining ElderLink, {formData.name}!
        </p>
        
        {userType === 'senior' ? (
          <div>
            <p className="mb-4">We'll match you with a volunteer based on your interests and availability.</p>
            <p className="mb-4">You'll receive an email with instructions on how to connect with your companion.</p>
          </div>
        ) : (
          <div>
            <p className="mb-4">Thank you for volunteering your time to connect with seniors.</p>
            <p className="mb-4">We'll match you with seniors who share your interests and availability.</p>
          </div>
        )}
        
        <button
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg focus:outline-none focus:shadow-outline"
          onClick={() => setStep('dashboard')}
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="max-w-6xl mx-auto p-4">
      <header className="bg-blue-700 text-white p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ElderLink Dashboard</h1>
        <div className="flex items-center">
          <span className="mr-4">{formData.name}</span>
          <button className="bg-white text-blue-700 px-3 py-1 rounded">Sign Out</button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              {userType === 'senior' ? 'Your Connections' : 'Seniors You Support'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userType === 'senior' ? (
                <div className="border p-4 rounded-lg flex items-center">
                  <img src="/api/placeholder/60/60" alt="placeholder" className="rounded-full mr-4" />
                  <div>
                    <h3 className="font-bold">Sarah Thompson</h3>
                    <p className="text-sm text-gray-600">Interests: Reading, Gardening</p>
                    <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm">Start Video Call</button>
                  </div>
                </div>
              ) : (
                <div className="border p-4 rounded-lg flex items-center">
                  <img src="/api/placeholder/60/60" alt="placeholder" className="rounded-full mr-4" />
                  <div>
                    <h3 className="font-bold">Robert Johnson</h3>
                    <p className="text-sm text-gray-600">Interests: History, Music</p>
                    <p className="text-sm text-gray-600">Needs help with: Technology Support</p>
                    <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm">Start Video Call</button>
                  </div>
                </div>
              )}
              
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
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">
                    {userType === 'senior' ? 'Call with Sarah' : 'Call with Robert'}
                  </h3>
                  <p className="text-gray-600">Tuesday, March 4, 2025 • 2:00 PM</p>
                </div>
                <div>
                  <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Join</button>
                  <button className="border border-gray-300 px-3 py-1 rounded">Reschedule</button>
                </div>
              </div>
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
                <h3 className="font-bold">{formData.name}</h3>
                <p className="text-gray-600">{userType === 'senior' ? 'Senior Member' : 'Volunteer'}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="font-bold mb-1">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map(interest => (
                  <span key={interest} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="font-bold mb-1">Availability</h4>
              <div className="flex flex-wrap gap-2">
                {formData.availability.map(slot => (
                  <span key={slot} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {slot}
                  </span>
                ))}
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

  // Determine which component to render based on the current step
  const renderCurrentStep = () => {
    switch(step) {
      case 'welcome':
        return renderWelcome();
      case 'register':
        return renderRegistrationForm();
      case 'confirmation':
        return renderConfirmation();
      case 'dashboard':
        return renderDashboard();
      default:
        return renderWelcome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {renderCurrentStep()}
    </div>
  );
};

export default ElderLink;
