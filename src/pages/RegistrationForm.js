import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const RegistrationForm = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userType = searchParams.get('userType');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        interests: [],
        availability: [],
        needsHelp: []
    });
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
      if (userType !== 'senior' && userType !== 'volunteer') {
        navigate('/'); // Redirect to home if userType is invalid
      }
    }, [userType, navigate]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Register the user
            await register(formData.email, formData.password, formData.name);

            // Additional logic for storing profile data would go here

            navigate('/confirmation'); // Navigate to a confirmation page
        } catch (error) {
            // Error handling is already managed in AuthContext
        } finally {
            setLoading(false);
        }
    };

    if (!userType) {
        return null; // Or a loading spinner, etc.
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">
                {userType === 'senior' ? 'Senior Registration' : 'Volunteer Registration'}
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
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
                            required
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
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            required
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
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                          disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Submit Registration'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
