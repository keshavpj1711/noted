// src/components/auth/Auth.jsx
import { useState } from 'react';
import bgVector from '../../assets/bg_vector.png';


function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login attempt:', { email: formData.email, password: formData.password });
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Signup attempt:', formData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative 
      overflow-hidden bg-[length:40%_auto] bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgVector})`, // Replace with your image path
      }}
    >
      <div
          aria-hidden="true"
          className="absolute top-0  w-[300px] h-[300px] md:w-[600px] md:h-[600px] 
                     bg-green-500/40 rounded-full 
                     filter blur-[150px] md:blur-[200px] 
                     opacity-80 translate-x-1 translate-y-1/3 
                     pointer-events-none z-0"
      ></div>
      {/* Dark overlay to ensure form visibility */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Auth Form Container - FIXED HEIGHT */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        {/* Glassmorphism Card with FIXED HEIGHT */}
        <div className="bg-black/50 backdrop-blur-md border border-green-800/30 
        rounded-2xl p-8 shadow-2xl h-[500px] flex flex-col">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-black/30 rounded-lg p-1 border border-green-500/20 flex-shrink-0">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin
                  ? 'bg-green-600/20 text-white border border-green-500/50'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin
                  ? 'bg-green-600/20 text-white border border-green-500/50'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Signup
            </button>
          </div>

          {/* Form - FLEX GROW TO FILL REMAINING SPACE */}
          <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between">
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:border-green-600 
                           focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:border-green-600 
                           focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>

              {/* Confirm Password Field - CONDITIONAL WITH SMOOTH TRANSITION */}
              <div className={`transition-all duration-300 ${!isLogin ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:border-green-500 
                           focus:ring-1 focus:ring-green-500 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button - ALWAYS AT BOTTOM */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-200 hover:bg-white text-black font-semibold 
                       rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:ring-opacity-50 mt-6"
            >
              {isLogin ? 'Login' : 'Signup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
