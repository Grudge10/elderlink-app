import React, { useState } from 'react';
import Welcome from './Welcome';
import RegistrationForm from './RegistrationForm';
import Confirmation from './Confirmation';
import Dashboard from './Dashboard';

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

  const renderCurrentStep = () => {
    switch (step) {
      case 'welcome':
        return <Welcome setUserType={setUserType} setStep={setStep} />;
      case 'register':
        return <RegistrationForm userType={userType} formData={formData} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} interestOptions={interestOptions} timeSlots={timeSlots} helpCategories={helpCategories} />;
      case 'confirmation':
        return <Confirmation userType={userType} formData={formData} setStep={setStep} />;
      case 'dashboard':
        return <Dashboard userType={userType} formData={formData} />;
      default:
        return <Welcome setUserType={setUserType} setStep={setStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {renderCurrentStep()}
    </div>
  );
};

export default ElderLink;
