'use client';

import { User, BookOpen } from 'lucide-react';
import Link from 'next/link';
import {useCallback, useEffect, useState } from 'react';
import PostCard from './PostCard';

const HomePageComponent = () => {
  const [posts,setPosts]=useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   const fetchPosts=useCallback(async()=>{
      try
      {
          const response = await fetch('/api/posts/fetch-posts');

          const data = await response.json();
          if(data.success)
          setPosts(data.posts);
      }
      catch(err)
      {
         console.log("Error",err);
      }
    },[])

    const checkAuthStatus =useCallback(async()=>{
      try {
          const response=await fetch('/api/admin/status');
          const data=await response.json();
          
          if (data.success)
            setIsLoggedIn(true);
          else
            setIsLoggedIn(false);
        }
        catch(error)
        {
          console.log('Auth check error:', error);
          setIsLoggedIn(false);
      }
    },[]);

  useEffect(() => {
    const initializeData = async () => {
        try
        {
           await Promise.all([fetchPosts(),checkAuthStatus()]);
        }
        catch(err)
        {
            console.log('Initialization error:',err);
        }
        finally
        {
           setLoading(false);
        }
    };
    initializeData();
  }, [fetchPosts, checkAuthStatus]);

  const handleLogout = async () => {
    try 
    {
        const response=await fetch('/api/admin/logout',{method:'POST'});
        if(response.ok)
        setIsLoggedIn(false);
    }
     catch(error)
     {
       console.error('Logout error:', error);
     }
  };

  if(loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <section className="relative bg-gradient-to-r from-white via-blue-50/20 to-indigo-50/30 shadow-sm border-b border-gray-100/50">
           <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 "></div>

        <div className="absolute top-6 right-6 z-10">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200/50 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Welcome, Admin</span>
              </div>
              <div className="w-[1px] h-6 bg-gray-300"></div>
              <div className="flex space-x-2">
                <Link href="/dashboard">
                  <button className="cursor-pointer group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer group bg-gradient-to-r from-red-400 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link href="/admin/login">
              <button className="cursor-pointer group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] backdrop-blur-sm">
                <span className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Admin Login</span>
                </span>
              </button>
            </Link>
          )}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-400/50">
                <BookOpen className="w-4 h-4" />
                <span>Welcome to Readora</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent sm:text-6xl md:text-7xl leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Stories & Insights
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed sm:text-xl">
              Explore our collection of carefully crafted articles, insights, and knowledge from talented writers around the world.
            </p>
          </div>
        </div>
      </section>

     <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Latest Posts
                    </h2>
                    <p className="mt-2 text-gray-600">Fresh stories and insights from our writers</p>
                </div>
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className='text-gray-700'>{posts.length} Posts Available</span>
                </div>
            </div>
         <PostCard posts={posts}/>
      </section>
  
    </div>
  );
}

export default HomePageComponent