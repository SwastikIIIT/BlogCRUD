'use client'
import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Eye, Trash2,Home } from 'lucide-react';
import TextEditor from './TextEditor';
import generateSlug from '@/helper/generateSlug';
import formatDate from '@/helper/formatDate';
import Link from 'next/link';


const EditPost = ({slug}) => {
  const [postData, setPostData] = useState(null);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [postSlug,setPostSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchPostBySlug=async()=>{
      setIsLoading(true);
      try
      {
        const response=await fetch(`/api/posts/${slug}`,{
          method:'GET',
          headers:{
            'Content-type':'application/json'
          }
        });
        const data=await response.json();
        if(data.success)
        {
            setTitle(data?.post.title);
            setContent(data?.post.content);
            setPostSlug(data?.post.slug);
            setPostData(data?.post);
        } 
          
      }
      catch(err)
      {
         console.log("Error fetching post:", err);
      }
      finally
      {
        setIsLoading(false);
      }
    }
        
     
    fetchPostBySlug();
  }, [slug]);


  useEffect(() => {
      setPostSlug(generateSlug(title));
  }, [title]);

  const handleUpdate = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/posts/${postData.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const result = await response.json();
      console.log("Result:",result);
       if(result.success)
       {
         setMessage('Post updated successfully!');
       } 
        else
        setMessage('Failed to update post');
      
      }
      catch(err) 
      {
        setMessage('An error occurred while updating the post',err);
      } 
      finally 
      {
        setIsLoading(false);
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16">
    
            <div className="flex items-center space-x-6">
                <Link href="/">
                  <button className="cursor-pointer group flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group border border-blue-100/50">
                    <Home className="h-5 w-5  text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </button>
                </Link>

                <Link href="/dashboard">
                  <button className="cursor-pointer group flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-gray-950 hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-400/50">
                    <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-0.5" />
                    <span className="text-sm font-medium">Dashboard</span>
                  </button>
                </Link>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Edit Post
              </h1>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-amber-50 text-amber-700 text-sm font-medium rounded-full border border-amber-200/50">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>Editing</span>
              </div>
            </div>
          </div>
        </div>
      </header>
             

      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Post Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Created:</span> {formatDate(postData.createdAt)}
            </div>
            <div>
              <span className="font-medium">Last Updated:</span> {formatDate(postData.updatedAt)}
            </div>
            <div>
              <span className="font-medium">Original Slug:</span> 
              <span className="font-mono ml-1">/{postData.slug}</span>
            </div>
            <div>
              <span className="font-medium">Post ID:</span> 
              <span className="font-mono ml-1">{postData._id}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
      
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog post title..."
              className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
              required
            />
            
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug
              </label>
              
              <div className="flex items-center  cursor-not-allowed space-x-2">
                <span className="text-sm text-gray-600 font-mono">{title?`/`:""}</span>
                <input
                  type="text"
                  value={postSlug}
                  disabled={true}
                  onChange={(e) =>setPostSlug(e.target.value)}
                  className="flex-1  cursor-not-allowed text-sm text-gray-600 font-mono bg-transparent border-none outline-none"
                />
              </div>

              {postSlug !== postData.slug && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠️ Changing the slug will update the post URL. This may affect SEO and existing links.
                </p>
              )}

            </div>
          </div>

          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Content
            </label>
            <TextEditor value={content} onChange={setContent} />
          </div>

      
          <div className="flex justify-between items-center">
            <div>
              {message && (
                <div className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              
              <button
                onClick={handleUpdate}
                disabled={isLoading}
                className="flex cursor-pointer items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>) 
                  :(<Save className="h-4 w-4 mr-2"/>)}{isLoading?'Updating...':'Update Post'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditPost;