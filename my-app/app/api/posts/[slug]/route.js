import generateSlug from "@/helper/generateSlug";
import Post from "@/models/Post";
import { connectToMongo } from "@/utils/database";
import { sanitizeForServer } from "@/utils/sanatize";
import { NextResponse } from "next/server";


export async function GET(req,{params}) {
    const {slug}= await params;
    try {
        await connectToMongo();
        const post=await Post.findOne({slug});
        
        if(!post)
        {
            return NextResponse.json({error:"Post not found"},{status:404});
        }
        return NextResponse.json({success:true,post},{status:200});
    } 
    catch (error) 
    {
        console.log("Error fetching post:", error);
        return NextResponse.json({error:"Failed to fetch post"},{status:500});
    }    
}

export async function PUT(req,{params}) {
    const {title,content}=await req.json();
    const originalSlug=(await params).slug;
    
    try{
         await connectToMongo();
         const newSlug=generateSlug(title);
    
         console.log("Original Slug:", originalSlug);
         console.log("New Slug:", newSlug);

         if(originalSlug!== newSlug)
         {
            const existingPost=await Post.findOne({slug:newSlug});
            if(existingPost)
            {
                console.log("Post with this slug already exists in this api call");
              return NextResponse.json({error:"Post with this slug already exists"},{status:400});
            }
         }
         
        const sanitizedText=sanitizeForServer(content);
        const updatedPost=await Post.findOneAndUpdate(
             {slug: originalSlug},
            { 
               title,
               content:sanitizedText,
               slug: newSlug,
               updatedAt: new Date(),
            },
            {new:true}
        );

        return NextResponse.json({success:true,post:updatedPost},{status:200});

    }
    catch(err)
    {
        console.log("Error updating post:", err);
        return NextResponse.json({error:"Failed to update post"},{status:500});
    }

}


export async function DELETE(req,{params}) {
    const {slug} = await params;
    
    try {
        await connectToMongo();
        
        const deletedPost = await Post.findOneAndDelete({slug});
    
        if (!deletedPost) 
        return NextResponse.json({error:"Post not found"},{status:404});
        

        return NextResponse.json({success:true,message:"Post deleted successfully"},{status:200 });

    }
    catch (error) {
        console.log("Error deleting post:", error);
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
