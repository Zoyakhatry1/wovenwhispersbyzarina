'use client';

import { useState, useEffect } from 'react';
import ProductManager from '@/components/admin/ProductManager';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple password - you should change this!
  const ADMIN_PASSWORD = 'crochet2025'; // CHANGE THIS to something secure

  useEffect(() => {
    // Check if already logged in (stored in browser)
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminLoggedIn', 'true');
      setError('');
    } else {
      setError('Incorrect password!');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminLoggedIn');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-100 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full border-2 border-amber-200">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-amber-700 bg-clip-text text-transparent mb-2">
              Admin Login
            </h1>
            <p className="text-slate-600">Enter password to manage products</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-400 focus:outline-none transition-all"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-amber-700 hover:text-amber-800 font-semibold text-sm"
            >
              ← Back to Store
            </a>
          </div>

          <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
            <p className="text-xs text-amber-800">
              <strong>⚠️ Security Note:</strong> Change the password in the code (app/admin/page.jsx) to something secure!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-slate-50">
      <header className="bg-gradient-to-r from-slate-50 to-stone-50 backdrop-blur-md border-b border-amber-100 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">⚙️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-amber-700 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-xs text-slate-600">Product Management</p>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold transition-all"
            >
              View Store
            </a>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-4 py-2 rounded-full font-semibold shadow-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <ProductManager />
    </div>
  );
}
