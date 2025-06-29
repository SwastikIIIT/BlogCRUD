import Post from "@/models/Post";
import { connectToMongo } from "./database";

export async function getPostBySlug(slug) {
    try
    {
        await connectToMongo();
       const post=await Post.findOne({slug:slug}).lean();
        
       if(post)
       {
            return {
                ...post,
                _id: post._id.toString(),
                createdAt: post.createdAt.toISOString(),
                updatedAt: post.updatedAt.toISOString(),
            }
       }
       return null;
    } 
    catch(error)
    {
        console.error('Error fetching post for SEO:', error);
        return null;
    }
}

export function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
