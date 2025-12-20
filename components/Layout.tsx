import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart, user, logout } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Pattern Bar */}
        <div className="h-2 w-full bg-pattern"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-serif font-bold text-brand-800 tracking-wider">
                AFRIC<span className="text-accent-500">TALES</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className={`text-sm font-medium hover:text-accent-500 ${isActive('/') ? 'text-accent-500' : 'text-gray-700'}`}>Home</Link>
              <Link to="/shop" className={`text-sm font-medium hover:text-accent-500 ${isActive('/shop') ? 'text-accent-500' : 'text-gray-700'}`}>Shop</Link>
              <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-accent-500">About</Link>
              
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-sm font-medium text-brand-600 hover:text-brand-800">Admin</Link>
              )}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* User Auth */}
              <div className="hidden md:block">
                {user ? (
                   <div className="flex items-center space-x-3">
                     <div className="flex flex-col items-end">
                       <span className="text-xs text-gray-500">Hi, {user.name}</span>
                       <div className="flex space-x-2">
                         <Link to="/orders" className="text-xs font-bold text-brand-600 hover:underline">My Orders</Link>
                         <span className="text-gray-300">|</span>
                         <button onClick={logout} className="text-xs text-red-500 hover:text-red-700">Logout</button>
                       </div>
                     </div>
                   </div>
                ) : (
                  <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-accent-500">Login</Link>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="relative group p-2 text-gray-700 hover:text-accent-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-500 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-accent-500 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-500 hover:bg-gray-50">Home</Link>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-500 hover:bg-gray-50">Shop</Link>
              {user ? (
                 <>
                   <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-brand-600 hover:bg-gray-50">My Orders</Link>
                   <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50">Logout ({user.name})</button>
                 </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-500 hover:bg-gray-50">Login</Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 text-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Africtales</h3>
              <p className="text-sm text-brand-300">
                Connecting you to the heart of Africa through authentic art, crafts, and heritage.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shop" className="hover:text-accent-500">All Products</Link></li>
                <li><Link to="/shop" className="hover:text-accent-500">New Arrivals</Link></li>
                <li><Link to="/shop" className="hover:text-accent-500">Best Sellers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="hover:text-accent-500">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-accent-500">Terms & Conditions</Link></li>
                <li><Link to="/terms" className="hover:text-accent-500">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Nairobi, Kenya</li>
                <li>support@africtales.com</li>
                <li>+254 700 000 000</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-brand-800 text-center text-xs text-brand-400">
            &copy; {new Date().getFullYear()} Africtales. All rights reserved.
          </div>
        </div>
        <div className="h-2 w-full bg-pattern"></div>
      </footer>
    </div>
  );
};

export default Layout;