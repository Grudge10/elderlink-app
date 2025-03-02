import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Confirmation = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="bg-green-50 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Registration Complete!</h1>
        
        <p className="text-xl mb-6">
          Thank you for joining ElderLink, {currentUser?.name}!
        </p>
        
        {/* Placeholder content - in a real app, this would be dynamic */}
        <div>
          <p className="mb-4">We'll match you based on your profile information.</p>
          <p className="mb-4">You'll receive an email with further instructions.</p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
