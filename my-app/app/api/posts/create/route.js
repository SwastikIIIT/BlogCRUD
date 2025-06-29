import generateSlug from "@/helper/generateSlug";
import Post from "@/models/Post";
import { connectToMongo } from "@/utils/database";
import { sanitizeForServer } from "@/utils/sanatize";
import { NextResponse } from "next/server";

export async function POST(req)
{
     const {title,content}=await req.json();
     console.log("Title and Content",title,content);
     try
     {
           await connectToMongo();
           if (!title || !content) 
           {
                 return NextResponse.json({error:'Title and content are required' },{ status: 400 });
           }
    
           const slug=generateSlug(title);
           
           const exisitingPost=await Post.findOne({slug});
           if(exisitingPost)
            return NextResponse.json({error:"A post with this title already exists"},{status:400});

           const sanitizedText=sanitizeForServer(content);
           console.log("Sanatized text from create:",sanitizedText);

           const post=await Post.create({
               title,
               content:sanitizedText,
               slug,
           });

           return NextResponse.json({success:true,post:{...post,_id:post._id}},{status:200});
     }
     catch(err)
     {
            console.log("Error creating post:",err);
           return NextResponse.json({error:err},{status:400});
     }
}