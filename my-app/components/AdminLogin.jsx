'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Shield, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { set } from 'mongoose';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  
  useEffect(() => {
    const checkAuthStatus=async()=>{
        try {
        const response = await fetch('/api/admin/status');
        const data = await response.json();
        if(data.success) 
        router.push('/dashboard');
        else
        setLoading(false); 
        
        }catch(error){
            console.log("Error checking auth status:", error); 
            setLoading(false);
        }
    };
    checkAuthStatus();
  }, []);

  const handleLogin=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
         const response = await fetch('/api/admin/login',{
            method:'POST',
            headers:{
            'Content-Type': 'application/json',
            },
            body:JSON.stringify(credentials),
         });

        const data=await response.json();

        if (data.success)
        {
            router.push('/dashboard');
            router.refresh(); 
        }
        else 
        setError(data.error);
        
     }
     catch(error)
     {
       setError('Network error.Please try again.');
     }
     finally
     {
       setLoading(false);
     }
  };

  if (loading) {
    return (
       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-medium">Checking authentication...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Admin Portal
            </h2>
            <p className="mt-2 text-gray-600 font-medium">
              Secure administrator access
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium text-sm">Authentication Failed</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-700" />
                </div>
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e)=>setCredentials({...credentials,username: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-700" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-12 pr-12 py-3 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button
                  type="button"
                  className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={()=>setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
                  <Shield className="w-5 h-5" />
                  <span>Sign In</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Only authorized administrators can access this system</span>
            </div>
          </div>
        </div>

       
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-600 border border-gray-400/20">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Protected by advanced security protocols</span>
          </div>
        </div>
      </div>
    </div>
  );
}