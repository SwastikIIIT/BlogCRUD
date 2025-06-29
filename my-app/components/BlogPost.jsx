'use client';
import Link from 'next/link';
import formatDate from '@/helper/formatDate';
import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { sanitizeForClient } from '@/utils/sanatize';

const BlogPost=({slug}) => {
    const [post,setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPostBySlug = async() => {
            try {
                const response = await fetch(`/api/posts/${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                const data=await response.json();
                if(data.success)
                setPost(data.post);
            }
            catch(err) {
                console.log("Error fetching post:", err);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchPostBySlug();
    }, [slug]);

    
    if(isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-600 absolute top-0 left-0"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <button 
                        onClick={()=>window.history.back()}
                        className="cursor-pointer inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-200 " />
                        <span className="font-medium">Previous</span>
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-gray-300"></div>

                <article className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-300/50 overflow-hidden">
                    <header className="px-8 pt-12 pb-8 bg-gradient-to-r from-slate-100/50 to-white/50 border-b border-slate-300">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight">
                                {post.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-8 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <time dateTime={post.createdAt} className="font-medium">
                                        Published {formatDate(post.createdAt)}
                                    </time>
                                </div>
                                {post.updatedAt !== post.createdAt && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="font-medium">
                                            Updated {formatDate(post.updatedAt)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    <div className="prose px-8 py-12 text-black max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-500">
                        <div dangerouslySetInnerHTML={{ __html:sanitizeForClient(post.content)}}/>
                    </div>

                    
                    <footer className="px-8 py-6 bg-gradient-to-r from-slate-100/50 to-white/50 border-t border-slate-300">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-500">
                                Thanks for reading!
                            </div>
                            <Link 
                                href="/"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                            >
                                <span>More Posts</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </footer>
                </article>
            </main>
        </div>
    )
}

export default BlogPost;