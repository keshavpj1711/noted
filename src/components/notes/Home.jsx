// src/components/notes/Home.jsx
import { Link } from 'react-router-dom'; // <--- IMPORT Link
import Card from "./Card";
import { dummyNotes } from "../../data/notes";

function Home() {
  const notes = dummyNotes;

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

      {/* Notes Grid */}
      {notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {notes.map((note) => (
            // Wrap Card with Link
            <Link key={note.id} to={`/user/note/${note.id}`} className="block h-full">
              <Card
                title={note.title}
                content={note.content}
                lastEditDate={note.lastEditDate}
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
