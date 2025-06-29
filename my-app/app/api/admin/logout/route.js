import { NextResponse } from "next/server";

export async function POST(req){
     
    try
    {
         const response=NextResponse.json({
            success: true,
            message: 'Logged out successfully'
        });
        response.cookies.delete('admin-token');
        return response;
    }
    catch(err)
    {
        console.log('Logout error:',err);
        return NextResponse.json({error:'Internal server error'},{status:500});
    }
}