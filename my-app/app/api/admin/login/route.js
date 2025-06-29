import { generateAdminToken, isAdmin } from "@/utils/adminAuth";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
        const {username,password}=await req.json();

        if(!username || !password) 
        return NextResponse.json({error:'Username and password are required'},{status:400});
        
        const adminResult=isAdmin(username,password);

        if (!adminResult.success) 
        return NextResponse.json({error:adminResult.error},{status:401});

        
        const token =await generateAdminToken(adminResult.admin);

        const response=NextResponse.json({
            success: true,
            message: 'Login successful',
            admin: {
                username: adminResult.admin.username,
                role: adminResult.admin.role
            }
        });

        
        response.cookies.set('admin-token',token,{
            httpOnly: true,
            maxAge: 24 * 60 * 60, // 24 hours
            path: '/',
        });
        return response;
    }
    catch(err)
    {
        console.log('Admin login error:', err);
        return NextResponse.json({error:'Internal server error'},{status:500}
    );
  }
}