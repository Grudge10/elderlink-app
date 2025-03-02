import React from 'react';

const Confirmation = ({ userType, formData, setStep }) => (
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

export default Confirmation;
