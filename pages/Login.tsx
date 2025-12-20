import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Button from '../components/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic
    if (email.includes('admin')) {
      login(email, 'admin');
      navigate('/admin');
    } else {
      login(email, 'customer');
      navigate('/');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border-t-4 border-brand-500">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif font-bold text-gray-900">
            {isRegister ? 'Join the Tribe' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRegister ? 'Create an account to track orders' : 'Sign in to access your account'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              {isRegister ? 'Register' : 'Sign in'}
            </Button>
          </div>
          
          <div className="text-center">
              <p className="text-xs text-gray-500 mt-2">(Use 'admin@africtales.com' for admin dashboard demo)</p>
          </div>
        </form>
        <div className="text-center">
            <button 
                onClick={() => setIsRegister(!isRegister)}
                className="text-sm font-medium text-brand-600 hover:text-brand-500"
            >
                {isRegister ? "Already have an account? Sign in" : "Don't have an account? Register"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;