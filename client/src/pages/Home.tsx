import { Link } from 'react-router-dom';
import homeimg from '../assets/hero.jpg'
export const Home = () => {
  const token = localStorage.getItem('access_token');
  const isAuthenticated = !!token;

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center text-center p-8"
      style={{ 
        backgroundImage: homeimg, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="bg-gray-800 bg-opacity-75 p-8 rounded-2xl shadow-2xl max-w-3xl mx-auto">
        <h1 className="text-4xl text-white font-bold mb-4">Welcome to Interview Generator</h1>
        <p className="text-gray-300 mb-6">Generate custom interview questions tailored to your skills and technologies. Get started today and ace your next interview!</p>
        <div className="space-x-4">
          {isAuthenticated ? (
            <Link to="/interview-generation" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg transition">
              Generate Interview
            </Link>
          ) : (
            <>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg transition">
                Get Started
              </Link>
              <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg transition">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};