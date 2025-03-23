'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    
    // Set loading state
    setStatus({ type: 'loading', message: 'Subscribing...' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      setStatus({ 
        type: 'success', 
        message: 'Thank you for subscribing to our newsletter! We will keep you updated with our latest news and offers.' 
      });
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Sorry, we could not process your subscription. Please try again later.' 
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
          aria-label="Email address for newsletter"
        />
        <button
          type="submit"
          className={`px-6 py-2 rounded-md transition duration-300 ${
            status?.type === 'loading' 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-teal-700 hover:bg-teal-800 text-white'
          }`}
          disabled={status?.type === 'loading'}
        >
          {status?.type === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      
      {status && (
        <div 
          className={`mt-3 text-sm ${
            status.type === 'error' ? 'text-red-600' :
            status.type === 'success' ? 'text-green-600' :
            'text-gray-600'
          }`}
          role="alert"
        >
          {status.message}
        </div>
      )}
    </form>
  );
}
