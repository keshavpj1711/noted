// src/components/NavBar.jsx
import { Link, NavLink } from "react-router-dom"; // Using NavLink for active styling

function NavBar() {
  const navLinkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-lg  hover:bg-gray-700/70 hover:border-gray-500 transition-colors duration-200
     ${isActive ? "bg-gray-800" : "text-gray-300 hover:text-white"}`;

  return (
    <nav className="w-full mx-8 mt-8 flex items-center rounded-lg justify-between px-4 md:px-6 py-4 bg-black/30 backdrop-blur-sm border border-gray-800/70 sticky top-0 z-30">
      {/* Logo and Brand */}
      <Link to="/user" className="flex items-center space-x-2.5 group">
        <div className="bg-green-600 hover:scale-110 p-1 rounded-full transition-transform">
          {/* Feather Icon for logo */}
          <img src="/noted.svg" alt="" className="h-8 w-8 md:h-8 md:w-8"/>
        </div>
        <span className="text-white font-semibold text-xl md:text-2xl tracking-tight group-hover:text-green-400 transition-colors">
          NOTED
        </span>
      </Link>

      {/* Navigation Links */}
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

      {/* Auth Button */}
      <div className="flex items-center">
        <Link
          to="/auth"
          className="px-5 py-2.5 rounded-lg bg-green-400 text-white font-semibold 
                     hover:bg-green-700 transition-transform hover:scale-105 duration-200
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Log In
        </Link>
        {/* Mobile Menu Button (optional, if you add mobile responsiveness later) */}
        {/* <button className="md:hidden ml-4 text-gray-300 hover:text-white">...</button> */}
      </div>
    </nav>
  );
}

export default NavBar;
