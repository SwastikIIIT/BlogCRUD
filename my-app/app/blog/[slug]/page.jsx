import BlogPost from '@/components/BlogPost';
import { getPostBySlug, stripHtml } from '@/utils/metaData';
import React from 'react'

export async function generateMetadata({params})
{
  const {slug}=await params;
  console.log("Generating metadata for blog post:", slug);
   const post=await getPostBySlug(slug);

  if(!post){
    return {
      title: 'Post Not Found | Blog',
      description: 'The requested blog post could not be found.',
      robots: {index:false,follow:false}
    }
  }


  const text = stripHtml(post.content);
  const excerpt=text.length>157?text.slice(0, 157)+'…':text;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl=`${baseUrl}/blog/${post.slug}`;

  return {
        title: `${post.title} | Blog`,
        description: excerpt,
        openGraph: {
            title: post.title,
            description: excerpt,
            url: canonicalUrl,
            siteName: 'Your Blog',
            type: 'article',
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt
        },

        alternates:{canonical: canonicalUrl},
        robots: {index:true,follow:true},
        other: {'article:published_time':post.createdAt,'article:modified_time':post.updatedAt}
  }
}


const BlogPostPage = async ({ params }) => {
  const { slug } = await params;
  return <BlogPost slug={slug} />;
};

export default BlogPostPage;