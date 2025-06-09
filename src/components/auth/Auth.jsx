// src/components/auth/Auth.jsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import bgVector from '../../assets/bg_vector.png';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        const { data, error } = await signIn(formData.email, formData.password);
        if (error) {
          setError(error.message);
        } else {
          navigate('/user'); // Redirect to notes page
        }
      } else {
        // Signup validation
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match!');
          setLoading(false);
          return;
        }
        
        const { data, error } = await signUp(formData.email, formData.password);
        if (error) {
          setError(error.message);
        } else {
          setMessage('Check your email for the confirmation link!');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setMessage('');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative 
      overflow-hidden bg-[length:40%_auto] bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgVector})`,
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

      {/* Auth Form Container - FIXED HEIGHT with better spacing */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        {/* Glassmorphism Card with FIXED HEIGHT */}
        <div className="bg-black/50 backdrop-blur-md border border-green-800/30 
        rounded-2xl p-6 shadow-2xl min-h-[520px] max-h-[520px] flex flex-col justify-between">
          
          {/* Top Section: Tab Switcher */}
          <div>
            <div className="flex mb-6 bg-black/30 rounded-lg p-1 border border-green-500/20">
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

            {/* Error/Success Messages - Absolute positioned to not affect layout */}
            {(error || message) && (
              <div className="mb-4">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                    {error}
                  </div>
                )}
                {message && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-200 text-sm">
                    {message}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Middle Section: Form Fields */}
          <div className="flex-grow flex flex-col justify-center space-y-4">
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

            {/* Confirm Password Field - Smooth transition without affecting layout */}
            <div className={`transition-all duration-300 overflow-hidden ${
              !isLogin ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
            }`}>
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

          {/* Bottom Section: Buttons */}
          <div className="space-y-3 mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 px-4 bg-gray-200 hover:bg-white text-black font-semibold 
                       rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {loading ? 'Loading...' : (isLogin ? 'Login' : 'Signup')}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/50 text-gray-400">or</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg 
                       hover:bg-gray-100 transition-colors duration-200 focus:outline-none 
                       focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50
                       flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
