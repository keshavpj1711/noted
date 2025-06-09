// src/components/NavBar.jsx
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { user, signOut } = useAuth();

  const navLinkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-lg hover:bg-green-700/20 transition-colors duration-200
     ${isActive ? "bg-green-700/30" : "text-gray-300 hover:text-white"}`;

  const navLinkIconClasses = ({ isActive }) =>
    `p-3 rounded-lg hover:bg-green-700/20 transition-colors duration-200 flex items-center justify-center
     ${isActive ? "bg-green-700/30" : "text-gray-300 hover:text-white"}`;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="sticky top-8 z-30 px-8 mt-6 w-full">
      <nav className="w-full flex items-center rounded-lg justify-between 
      px-4 md:px-2 py-2 bg-black/30 backdrop-blur-sm border border-gray-100/50">
        
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="bg-green-800 hover:scale-110 p-1 rounded-full transition-transform">
            <img src="/noted.svg" alt="" className="h-8 w-8 md:h-8 md:w-8" />
          </div>
          {/* Show NOTED text only on md and above */}
          <span className="hidden md:block text-white font-semibold text-xl tracking-tight group-hover:text-green-400 transition-colors">
            NOTED
          </span>
        </Link>

        {/* Navigation Links - Only show if user is logged in */}
        {user && (
          <>
            {/* Desktop Navigation - Text based (md and above) */}
            <div className="hidden md:flex items-center space-x-3 md:space-x-4">
              <NavLink to="/user" className={navLinkClasses}>
                Home
              </NavLink>
              <NavLink to="/create" className={navLinkClasses}>
                Create
              </NavLink>
              <NavLink to="/settings" className={navLinkClasses}>
                Settings
              </NavLink>
            </div>

            {/* Mobile Navigation - Icon based (below md) */}
            <div className="flex md:hidden items-center space-x-2">
              <NavLink to="/user" className={navLinkIconClasses} title="Home">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </NavLink>

              <NavLink to="/create" className={navLinkIconClasses} title="Create Note">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </NavLink>

              <NavLink to="/settings" className={navLinkIconClasses} title="Settings">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </NavLink>
            </div>
          </>
        )}

        {/* Auth Button */}
        <div className="flex items-center">
          {user ? (
            <>
              {/* Desktop Logout Button - Text (md and above) */}
              <button
                onClick={handleSignOut}
                className="hidden md:flex items-center px-5 py-2.5 rounded-lg bg-green-900 text-white font-semibold 
                           hover:bg-green-700 transition-transform hover:scale-105 duration-200
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                title="Log Out"
              >
                Log Out
              </button>

              {/* Mobile Logout Icon (below md) */}
              <button
                onClick={handleSignOut}
                className="flex md:hidden p-3 rounded-lg bg-green-900 text-green-300 
                           hover:bg-green-700 hover:text-green-200 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                           items-center justify-center"
                title="Log Out"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </>
          ) : (
            <>
              {/* Desktop Login Button - Text (md and above) */}
              <Link
                to="/auth"
                className="hidden md:flex items-center px-5 py-2.5 rounded-lg bg-green-900 text-white font-semibold 
                           hover:bg-green-700 transition-transform hover:scale-105 duration-200
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                title="Log In"
              >
                Log In
              </Link>

              {/* Mobile Login Icon (below md) */}
              <Link
                to="/auth"
                className="flex md:hidden p-3 rounded-lg bg-green-900 text-green-300 
                           hover:bg-green-700 hover:text-green-200 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                           items-center justify-center"
                title="Log In"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
