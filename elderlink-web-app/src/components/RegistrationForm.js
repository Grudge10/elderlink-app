import React from 'react';

const RegistrationForm = ({ userType, formData, handleInputChange, handleCheckboxChange, interestOptions, timeSlots, helpCategories, setStep }) => (
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

export default RegistrationForm;