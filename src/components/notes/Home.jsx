// src/components/notes/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from "./Card";
import { fetchUserNotes } from "../../supabase/notes";
import { useAuth } from "../../contexts/AuthContext";

function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  // Fetch notes when component mounts or user changes
  useEffect(() => {
    const loadNotes = async () => {
      if (!user) return;
      
      setLoading(true);
      const { data, error } = await fetchUserNotes();
      
      if (error) {
        setError('Failed to load notes');
        console.error('Error loading notes:', error);
      } else {
        setNotes(data || []);
      }
      setLoading(false);
    };

    loadNotes();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-80px)]">
      {/* Search Section Placeholder (your existing code) */}
      <div className="mb-8">
        <div className="max-w-3xl mx-auto">
          <label htmlFor="search-notes" className="block text-sm font-medium text-gray-300 mb-1">
            Search Notes:
          </label>
          <div className="flex items-center bg-green-900/20 border border-gray-400/50 rounded-lg p-1">
            <input
              type="text"
              name="search-notes"
              id="search-notes"
              className="block w-full bg-transparent text-white border-none focus:ring-0 placeholder-gray-400 py-2 px-3"
              placeholder="Enter keywords..."
            />
            <button
              type="button"
              className="ml-2 bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-md transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Error Message (if any) */}
      {error && (
        <div className="mb-6 max-w-3xl mx-auto">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
            {error}
          </div>
        </div>
      )}

      {/* Notes Grid */}
      {notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {notes.map((note) => (
            // Wrap Card with Link
            <Link key={note.id} to={`/user/note/${note.id}`} className="block h-full">
              <Card
                title={note.title}
                content={note.content}
                lastEditDate={new Date(note.updated_at).toLocaleDateString('en-GB')}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-xl">No notes yet. Start creating!</p>
        </div>
      )}
    </div>
  );
}

export default Home;
