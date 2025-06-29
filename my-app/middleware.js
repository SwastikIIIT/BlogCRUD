import { NextResponse } from "next/server";
import { verifyAdminToken } from "./utils/adminAuth";

export async function middleware(req) {
     const { pathname } = req.nextUrl;
     if (pathname === '/api/posts/fetch-posts') 
      return NextResponse.next();
  
     const adminRoutes=[
        //  '/admin/login',
         '/dashboard',
         '/create-post',
         `/edit-post`
     ]

     const adminApiRoutes=[
        '/api/posts/create',
     ]

     const isAdminRoute=adminRoutes.some(it=>pathname.startsWith(it));
     const isAdminApiRoute=adminApiRoutes.some(it=>pathname.startsWith(it));

     if(isAdminApiRoute || isAdminRoute){
         const token=req.cookies.get('admin-token')?.value;

         if(!token)
         {
            if(isAdminApiRoute)
            return NextResponse.json({error:'Unauthorized access'}, {status: 401});
            else
            return NextResponse.redirect(new URL('/admin/login',req.url));
         }

         const decoded=await verifyAdminToken(token);
         if(!decoded)   //token is not valid
         {
            const response=isAdminApiRoute?NextResponse.json({error:'Invalid admin token'},{status: 401})
                :NextResponse.redirect(new URL('/admin/login',req.url));
              response.cookies.delete('admin-token'); 
            return response;
         }
     }
     return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard','/create-post','/edit-post/:path*',
    '/api/posts/create']
};