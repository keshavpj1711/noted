import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/landingPage/HeroSection";
import Home from "./components/notes/Home";

// Placeholder components for other routes (you'll build these out)
const CreateNotePage = () => (
  <div className="flex items-center justify-center h-[calc(100vh-80px)] text-white text-2xl">
    {/* Adjusted height to account for NavBar */}
    Create Note Page Content
  </div>
);
const SettingsPage = () => (
  <div className="flex items-center justify-center h-[calc(100vh-80px)] text-white text-2xl">
    Settings Page Content
  </div>
);
const AuthPage = () => (
  <div className="flex items-center justify-center h-[calc(100vh-80px)] text-white text-2xl">
    Authentication Page (Login/Signup)
  </div>
);

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Top-left Glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] 
                     bg-green-500/20 rounded-full 
                     filter blur-[150px] md:blur-[200px] 
                     opacity-80 translate-x-1/2 -translate-y-1/2 
                     pointer-events-none z-0"
        ></div>

        {/* Bottom-right Glow (can be smaller or adjusted) */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] 
                     bg-green-600/25 rounded-full 
                     filter blur-[120px] md:blur-[150px] 
                     opacity-70 -translate-x-1/3 translate-y-1/3 
                     pointer-events-none z-0"
        ></div>

        {/* Main Content Wrapper - must be on top of glows */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="flex justify-center">
            <NavBar />
          </div>
          <main className="flex-grow"> {/* Ensures footer (if any) stays at bottom */}
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="/user" element={<Home />} />
              <Route path="/create" element={<CreateNotePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
        </div>

        {/* Floating Create Note Icon - also needs to be on top */}
        <Link
          to="/create"
          className="fixed bottom-8 right-8 bg-green-800
                     text-white rounded-full p-3 md:p-2 shadow-2xl 
                     flex items-center justify-center z-20
                     transition-transform hover:scale-110"
          title="Create Note"
        >
          {/* Feather Icon: Edit 3 (or a plus icon) - example */}
          <img src="/noted.svg" alt="" className="h-10 w-10 md:h-10 md:w-10" />
        </Link>
      </div>
    </Router>
  );
}

export default App;
