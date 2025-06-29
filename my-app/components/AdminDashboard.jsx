'use client'
import React, { useState, useEffect } from 'react';
import { Plus,Home, Edit3, Trash2, Eye, Calendar, Search, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import formatDate from '@/helper/formatDate';


const AdminDashboard=()=>{
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [deletePost, setdeletePost] = useState(null);
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const [loading, setLoading]=useState(true);

  useEffect(() => {
      const fetchPosts = async() => {
        try 
          {
            const response = await fetch(`/api/posts/fetch-posts`);
            const data=await response.json();
            if(data.success)
            setPosts(data.posts);

            console.log('Posts',data);
          } 
          catch(err){
            console.log('Error fetching posts:',err);
          } 
          finally{
            setLoading(false);
          }
      }
      fetchPosts();
  }, []);

  const filteredPosts=posts.filter(post =>
    post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDelete=async (deletePost) => {
    setLoading(true);
    try {
        const response = await fetch(`/api/posts/${deletePost.slug}`, {
        method:'DELETE',
      });

      if (response.ok) 
        setPosts(posts.filter(post=>post.slug!==deletePost.slug));
        
      
    } catch (error) {
      console.error('Error deleting post:', error);
    }
    finally{
      setLoading(false);
      setShowDeleteModal(false);
      setdeletePost(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-6 sm:space-x-10">
                <Link 
                  href="/" 
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group border border-blue-100/50"
                >
                  <Home className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </Link>
                
                <div className="flex items-center space-x-3 sm:space-x-5">
                  <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs sm:text-sm font-medium rounded-full border border-blue-100/50 shadow-sm">
                    {posts.length} Posts
                  </div>
                </div>
              </div>

              <Link href="/create-post" className="hidden sm:flex">
                <button className="cursor-pointer group flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]">
                  <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90 duration-200" />
                  Create New Post
                </button>
              </Link>

              <Link href="/create-post" className="sm:hidden">
                <button className="group flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]">
                  <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-200" />
                </button>
              </Link>
            </div>
          </div>
        </header>

     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
              <input
                type="text"
                placeholder="Search posts by title or slug..."
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-gray-950 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {!loading && filteredPosts.length===0?(
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500 mb-4">
                {searchValue ? 'Try adjusting your search terms' : 'Get started by creating your first blog post'}
              </p>
              <button className="flex items-center cursor-pointer mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Post
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>

              <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500">
                <table className="w-full">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPosts.map((post) => (
                      <tr key={post._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 w-1/4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-[200px]">
                            {post.content.replace(/<[^>]*>/g, '').substring(0, 50)}...
                          </div>
                        </td>
                        <td className="px-6 py-4 w-1/5">
                          <div className="text-sm text-gray-600 font-mono">
                            /{post.slug}
                          </div>
                        </td>
                        <td className="px-6 py-4 w-1/6">
                            <div className="text-sm text-gray-500 truncate">
                            {formatDate(post.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 w-1/6">
                          <div className="text-sm text-gray-500 truncate">
                            {formatDate(post.updatedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 w-1/6">
                          <div className="flex items-center space-x-2">
                            <Link href={`/blog/${post.slug}`}> 
                              <button
                                className="text-blue-600 cursor-pointer hover:text-blue-900 p-1 rounded transition-colors"
                                title="View Post"
                              >
                                <Eye className="h-5 w-5" />
                              </button>
                            </Link> 

                            <Link href={`/edit-post/${post.slug}`}>
                              <button
                                className="cursor-pointer text-gray-600 hover:text-gray-900 p-1 rounded transition-colors"
                                title="Edit Post"
                              >
                                <Edit3 className="h-5 w-5"/>
                              </button>
                            </Link>

                            <button
                              onClick={() => {
                                setdeletePost(post);
                                setShowDeleteModal(true);
                              }}
                              className="cursor-pointer text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                              title="Delete Post"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>`
      </main>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Post</h3>
            <p className="text-gray-500 mb-4">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  deletePost(null);
                }}
                className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={()=>handleDelete(deletePost)}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;