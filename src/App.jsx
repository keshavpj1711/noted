import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/landingPage/HeroSection";
import Home from "./components/notes/Home";
import NoteEditor from "./components/notes/NoteEditor";
import CreateNotePage from "./components/notes/CreateNotePage";
import AuthPage from "./components/auth/Auth"
import ProtectedRoute from "./components/ProtectedRoute";

const SettingsPage = () => (
  <div className="flex items-center justify-center h-[calc(100vh-80px)] text-white text-2xl">
    Settings Page Content
  </div>
);

// Create a simple wrapper component that uses useLocation INSIDE Router
function AppContent() {
  const location = useLocation(); // Now this is INSIDE Router
  const showNavbar = location.pathname !== '/auth';

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Your existing glow effects */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] 
                   bg-green-500/20 rounded-full 
                   filter blur-[150px] md:blur-[200px] 
                   opacity-80 translate-x-1/2 -translate-y-1/2 
                   pointer-events-none z-0"
      ></div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] 
                   bg-green-600/25 rounded-full 
                   filter blur-[120px] md:blur-[150px] 
                   opacity-70 -translate-x-1/3 translate-y-1/3 
                   pointer-events-none z-0"
      ></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {showNavbar && ( // Fixed: was !showNavbar, should be showNavbar
          <div className="flex justify-center">
            <NavBar />
          </div>
        )}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Protected routes */}
            <Route path="/user" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/user/note/:noteId" element={
              <ProtectedRoute>
                <NoteEditor />
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <CreateNotePage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>

      {showNavbar && ( // Also hide floating button on auth page
        <Link
          to="/create"
          className="fixed bottom-8 right-8 bg-green-800
                     text-white rounded-full p-3 md:p-2 shadow-2xl 
                     flex items-center justify-center z-20
                     transition-transform hover:scale-110"
          title="Create Note"
        >
          <img src="/noted.svg" alt="" className="h-10 w-10 md:h-10 md:w-10" />
        </Link>
      )}
    </div>
  );
}

// Main App component - just wraps everything in Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
