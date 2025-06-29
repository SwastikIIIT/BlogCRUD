import { SignJWT, jwtVerify } from 'jose';

const AdminCredentials={
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
};

export function isAdmin(username, password) {

        if (username === AdminCredentials.username && password === AdminCredentials.password) 
        {
            return {
                success: true,
                admin:{
                    username: AdminCredentials.username,
                    role: 'admin'
                }
            };
        } 
        return {success:false,error: 'Invalid credentials'};
}


export async function generateAdminToken(admin)
{
    try
    {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        
        const token = await new SignJWT({
            username: admin.username,
            role: admin.role,
        })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .setIssuedAt()
        .sign(secret);
        
        return token;
    } catch (error)
    {
        console.log("Token generation failed:", error);
    }
}

export async function verifyAdminToken(token) {
    try
    {
         const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        
        if (payload.role !== 'admin') {
            throw new Error("Unauthorized access");
        }
        
        return payload;
    }
    catch(err)
    {
        console.log("Token verification failed:", err);
        return null;
    }
}