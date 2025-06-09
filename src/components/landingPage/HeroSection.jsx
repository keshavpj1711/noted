import HeroSectionImg from '../../assets/heroSection.png';

// src/components/HeroSection.jsx

import { Link } from "react-router-dom";
import WhyNote from './WhyNote';

function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 md:px-10 py-10 md:py-16 bg-transparent"> {/* Adjusted height */}
      <div className='flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-80px)] px-6 md:px-10 py-10 md:py-16 bg-transparent'>
        {/* Left: Illustration */}
        <div className="flex-1 flex justify-center items-center mb-10 lg:mb-0 lg:mr-10">
          {/* actual SVG or image imported*/}
          <img
            src={HeroSectionImg}
            alt="Note taking illustration with a scroll and feather"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg "
          />
        </div>

        {/* Right: Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            NOTED
          </h1>
          <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-6 leading-tight -my-2">
            Every Great Idea, Starts with a Note!
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-xl lg:max-w-2xl">
            Capture inspiration the moment it strikes.
            Your ideas deserve a beautiful home.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/create"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-green-900 text-white font-semibold 
                       hover:bg-green-700 transition-transform hover:scale-105 duration-200
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-center"
            >
              Create Note
            </Link>
            <Link
              to="/auth"
              className="w-full sm:w-auto px-8 py-3 rounded-lg border-2 border-gray-600 text-gray-200 
                       hover:bg-green-700/20 hover:border-gray-400 hover:text-white 
                       transition-all duration-200 text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <WhyNote />
    </section>
  );
}

export default HeroSection;
