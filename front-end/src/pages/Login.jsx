import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Music, Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Both email and password are required!");
      return;
    }
    setError(null);
    login(formData);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-[#121286]'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8 bg-[rgba(230,230,250,0.3)] backdrop-blur-lg rounded-xl p-6'>
          {/* Logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <Music className='w-8 h-8 text-primary text-white' />
              </div>
              <h1 className='text-2xl text-white font-bold mt-2'>Login to Your Account</h1>
              <p className='text-gray-400'>Resume Your Journey</p>
            </div>
          </div>

          {error && (
            <div className='text-red-500 text-center mb-4'>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              
              <label className='label'>
                <span className='label-text font-medium text-white'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='w-5 h-5 text-gray-400' />
                </div>
                <input
                  type='email'
                  className='input w-full pl-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='you@email.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              
              <label className='label'>
                <span className='label-text font-medium text-white'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='w-5 h-5 text-gray-400' />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='input w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5 text-gray-400' />
                  ) : (
                    <Eye className='w-5 h-5 text-gray-400' />
                  )}
                </button>
              </div>

              
              <button
                type='submit'
                className='btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white mt-5 pl-10 pr-12 py-3 rounded-lg'
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    Loading...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>

          <div className='text-center'>
            <p className='text-gray-400'>
              Don't have an account?{' '}
              <Link to='/signup' className='text-gray-300 hover:text-white'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
