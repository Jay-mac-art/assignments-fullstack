import { Link } from 'react-router-dom';
import { User as UserIcon } from 'lucide-react';

export const Navbar = () => {
  const token = localStorage.getItem('access_token');
  const isAuthenticated = !!token;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 p-4 shadow-2xl rounded-b-2xl">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-white text-2xl font-extrabold tracking-wide">
          Interview Generator
        </Link>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0 w-full sm:w-auto">
          <Link className="text-gray-200 hover:text-white transition" to="/">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link className="text-gray-200 hover:text-white transition flex items-center" to="/profile">
                <UserIcon className="w-5 h-5 mr-1" /> Profile
              </Link>
              <Link className="text-gray-200 hover:text-white transition" to="/interview-generation">
                Generate
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl shadow-lg transition w-full sm:w-auto"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="text-gray-200 hover:text-white transition" to="/login">
                Login
              </Link>
              <Link className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-2xl shadow-lg transition w-full sm:w-auto" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};