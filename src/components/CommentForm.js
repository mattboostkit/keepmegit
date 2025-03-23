'use client';

import { useState } from 'react';

export default function CommentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!comment) newErrors.comment = 'Comment is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // In a real app, you would submit the comment to your API
    // For now, we'll just simulate a successful submission
    setCommentSubmitted(true);
    setName('');
    setEmail('');
    setComment('');
    setErrors({});
  };
  
  if (commentSubmitted) {
    return (
      <div className="mb-6 p-4 rounded-md bg-green-50 text-green-700">
        Thank you for your comment. It will be reviewed and published shortly.
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 mb-1">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          className={`w-full px-4 py-2 border rounded-md ${errors.comment ? 'border-red-500' : 'border-gray-300'}`}
        ></textarea>
        {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
      </div>
      <button
        type="submit"
        className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition duration-300"
      >
        Submit Comment
      </button>
    </form>
  );
}
