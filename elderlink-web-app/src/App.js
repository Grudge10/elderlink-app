import React, { useState } from 'react';
import Welcome from './components/Welcome';
import RegistrationForm from './components/RegistrationForm';
import Confirmation from './components/Confirmation';
import Dashboard from './components/Dashboard';

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


  // Determine which component to render based on the current step
  const renderCurrentStep = () => {
    switch(step) {
      case 'welcome':
        return <Welcome setUserType={setUserType} setStep={setStep} />;
      case 'register':
        return (
          <RegistrationForm
            userType={userType}
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            interestOptions={interestOptions}
            timeSlots={timeSlots}
            helpCategories={helpCategories}
            setStep={setStep}
          />
        );
      case 'confirmation':
        return <Confirmation formData={formData} userType={userType} setStep={setStep} />;
      case 'dashboard':
        return <Dashboard formData={formData} userType={userType} setStep={setStep} />;
      default:
        return <Welcome setUserType={setUserType} setStep={setStep} />;
    }
  };

    // Placeholder image API
    const handleApiRequest = (req, res) => {
    if (req.url.startsWith('/api/placeholder')) {
      const [width, height] = req.url.split('/').slice(-2);
      const placeholder = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#ddd" />
          <text x="50%" y="50%" font-size="${Math.min(parseInt(width), parseInt(height)) / 4}" text-anchor="middle" dy=".3em" fill="#999">${width}x${height}</text>
        </svg>
      `;

      const base64 = Buffer.from(placeholder).toString('base64');
      const dataUrl = `data:image/svg+xml;base64,${base64}`;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ dataUrl }));
      return;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {renderCurrentStep()}
    </div>
  );
};

export default ElderLink;
