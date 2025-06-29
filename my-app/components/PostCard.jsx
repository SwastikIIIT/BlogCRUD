import formatDate from '@/helper/formatDate';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const PostCard = ({ posts }) => {
  return (    
    <>  
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We're working on bringing you amazing content. Check back soon for our latest posts!
          </p>
        </div>
      ) : (
        <div className="relative">  
          <div className="max-h-[80vh] overflow-y-auto custom-scrollbar px-3">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-4">
              {posts.map((post, index) => (
                <article  key={post._id} 
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden hover:shadow-xl hover:border-gray-300/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 ml-1.5"></div>
                      <div className="text-sm text-blue-600 font-medium">
                        Article #{String(index + 1).padStart(2,'0')}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <Link href={`/blog/${post.slug}`}>
                      <button className="cursor-pointer group/btn inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostCard;