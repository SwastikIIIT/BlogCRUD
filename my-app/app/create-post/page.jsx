"use client";
import React, { useState, useEffect } from "react";
import { Save, ArrowLeft, Eye ,Home} from "lucide-react";
import TextEditor from "../../components/TextEditor";
import generateSlug from "@/helper/generateSlug";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    setSlug(generateSlug(title));
  }, [title]);

  const handleSubmit=async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

      try {
        const response = await fetch("/api/posts/create",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        });

        const result= await response.json();

        if (response.ok) {
          setMessage("Post created successfully!");
          setTitle("");setContent("");setSlug("");
        } else {
          console.log("Error creating post:", result.error);
          setMessage("Failed to create post");
        }
      }
      catch(err)
      {
        console.log("Error creating post:", err);
        setMessage("An error occurred while creating the post");
      } 
      finally 
      { 
        setTimeout(()=>{
             setMessage("");
             setIsLoading(false);
        },1000);
      }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 items-center h-16">
              
              <div className="flex items-center space-x-3">
                <Link href="/">
                  <button className="cursor-pointer group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group border border-blue-100/50">
                    <Home className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </button>
                </Link>

                <Link href="/dashboard">
                  <button className="cursor-pointer group flex items-center px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-gray-700 hover:text-gray-950 hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-400/50">
                    <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 transition-transform group-hover:-translate-x-0.5" />
                    <span className="text-xs sm:text-sm font-medium">Dashboard</span>
                  </button>
                </Link>
              </div>

              <div className="hidden sm:flex items-center justify-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Create New Post
                </h1>
              </div>

              <div className="flex items-center justify-end space-x-2 sm:space-x-3">
                <div className="flex sm:hidden items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  <h1 className="text-sm font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Create New Post
                  </h1>
                </div>

                <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200/50">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Draft Mode</span>
                </div>

                <div className="flex sm:hidden items-center justify-center w-8 h-8 bg-green-50 rounded-full border border-green-200/50">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
        </header>
     
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Post Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Enter your blog post title..."
              className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
              required
            />


            {slug && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug (auto-generated)
                </label>
                <div className="text-sm text-gray-600 font-mono">
                  /{slug}
                </div>
              </div>
            )}
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
                <div
                  className={`text-base font-medium ${message.includes("success")?"text-green-600": "text-red-600"}`}
                >
                  {message}
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex cursor-pointer items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ?(
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ):
                (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Creating..." : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePostPage;
