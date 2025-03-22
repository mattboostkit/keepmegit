'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscriptionStatus('success');
    // In a real implementation, you would submit the email to your newsletter service
  };

  return (
    <>
      {subscriptionStatus === 'success' ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
          Thank you for subscribing! You'll receive our next newsletter.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              required
            />
            <button
              type="submit"
              className="btn btn-primary whitespace-nowrap px-6 py-2"
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      )}
    </>
  );
}
