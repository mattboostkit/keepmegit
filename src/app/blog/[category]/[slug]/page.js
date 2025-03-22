import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { serverClient } from '../../../../lib/sanity';
import CommentForm from '../../../../components/CommentForm';
import NewsletterForm from '../../../../components/NewsletterForm';
import dynamic from 'next/dynamic';

// Import the client component with no SSR
const ClientBlogPost = dynamic(() => import('./client-page'), { ssr: false });

export async function generateMetadata({ params }) {
  try {
    const query = `*[_type == "post" && slug.current == $slug][0]`;
    const post = await serverClient.fetch(query, { slug: params.slug });
    console.log('Generating metadata for post:', post);
    
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.'
      };
    }
    
    return {
      title: `${post.title} | KeepMe Blog`,
      description: post.excerpt || (post.body && post.body[0] && post.body[0].children && post.body[0].children[0] ? post.body[0].children[0].text : ''),
      openGraph: {
        title: post.title,
        description: post.excerpt || (post.body && post.body[0] && post.body[0].children && post.body[0].children[0] ? post.body[0].children[0].text : ''),
        images: post.featuredImage ? [post.featuredImage] : []
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
      description: 'KeepMe Blog Post'
    };
  }
}

export default async function BlogPostPage({ params }) {
  console.log('Rendering blog post page with params:', params);
  
  return <ClientBlogPost slug={params.slug} />;
}
