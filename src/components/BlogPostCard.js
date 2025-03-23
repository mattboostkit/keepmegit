import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default function BlogPostCard({ post }) {
  // Ensure we have valid data
  if (!post) return null;
  
  // Format the date in UK English style
  const formattedDate = post.publishedAt ? 
    format(new Date(post.publishedAt), 'd MMMM yyyy') : 
    'Date unavailable';
  
  // Get the category for the URL - ensure it's the slug, not the display name
  const categorySlug = post.categories && post.categories.length > 0 ? 
    (typeof post.categories[0] === 'object' && post.categories[0].slug?.current ? 
      post.categories[0].slug.current : 
      post.categories[0].toLowerCase().replace(/\s+/g, '-')) : 
    'uncategorised';
  
  // Get the slug
  const slug = post.slug?.current || '';
  
  // Build the correct URL for the blog post
  const postUrl = `/blog/${categorySlug}/${slug}`;
  
  return (
    <div className="blog-post-card bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={postUrl} className="block">
        <div className="relative h-56 w-full">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title || 'Blog post image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          
          {post.categories && post.categories[0] && (
            <span className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {post.categories[0]}
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="text-sm text-gray-600">
            {formattedDate}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-teal-700 transition duration-300">
          <Link href={postUrl}>
            {post.title || 'Untitled Post'}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt || 'No excerpt available for this post.'}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {post.author?.image ? (
              <Image
                src={post.author.image}
                alt={post.author.name || 'Author'}
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
                <span className="text-xs text-gray-500">{post.author?.name?.charAt(0) || 'A'}</span>
              </div>
            )}
            <span className="text-sm text-gray-700">{post.author?.name || 'Anonymous'}</span>
          </div>
          
          <Link 
            href={postUrl} 
            className="text-teal-700 hover:text-teal-900 text-sm font-medium flex items-center"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
