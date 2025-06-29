import Post from "@/models/Post";
import { connectToMongo } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req){
     try
     {
           await connectToMongo();
           const allPosts=await Post.find().sort({createdAt:-1}).lean();
           
           return NextResponse.json({success:true,posts:allPosts},{status:200});
     }
     catch(err)
     {
         console.log("Error fetching posts:",err);
         return NextResponse.json({error:"Failed to fetch posts"},{status:500});
     }
}