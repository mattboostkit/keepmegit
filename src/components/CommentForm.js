'use client';

import { useState } from 'react';

export default function CommentForm() {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentSubmitted(true);
    // In a real implementation, you would submit the comment to your backend
  };

  return (
    <>
      {commentSubmitted && (
        <div className="mb-6 p-4 rounded-md bg-green-50 text-green-700">
          Thank you for your comment. It will be reviewed and published shortly.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={commentEmail}
              onChange={(e) => setCommentEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Your email will not be published.</p>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            name="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary py-2 px-6"
        >
          Post Comment
        </button>
      </form>
    </>
  );
}
