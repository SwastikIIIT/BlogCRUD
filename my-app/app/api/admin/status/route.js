import { verifyAdminToken } from "@/utils/adminAuth";
import { NextResponse } from "next/server";


export async function GET(req) {
    try
    {
      const token=req.cookies.get('admin-token')?.value;

      if(!token)
      {
        console.log("Admin token:", token);
        return NextResponse.json({success:false},{status:401});
      }

      const decoded =await verifyAdminToken(token);
      if(!decoded) 
      {
        console.log("Invalid admin token:",decoded);
        return NextResponse.json({success:false},{status:401});
      }
    

        return NextResponse.json({success:true,
            admin:{
                username: decoded.username,
                role: decoded.role
             }
        });

    }
    catch(err)
    {
      console.log("Error verifying admin token:", err);
      return NextResponse.json({success:false},{status:401 });
    }
}