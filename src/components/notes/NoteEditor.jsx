// src/components/notes/NoteEditor.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNoteById, updateNote, createNote } from '../../supabase/notes'; // <-- IMPORT Supabase functions
import { useAuth } from '../../contexts/AuthContext'; // <-- IMPORT useAuth

function NoteEditor({ noteId: propNoteId, isCreating = false }) {
  const params = useParams();
  const noteId = isCreating ? null : (propNoteId || params.noteId);
  const navigate = useNavigate();
  const { user } = useAuth(); // <-- GET user from auth context

  const [currentNote, setCurrentNote] = useState(null);
  const [isEditing, setIsEditing] = useState(isCreating);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true); // <-- ADD loading state
  const [saving, setSaving] = useState(false); // <-- ADD saving state
  const [error, setError] = useState(''); // <-- ADD error state

  useEffect(() => {
    const loadNote = async () => {
      if (isCreating) {
        // For creating a new note, fields start empty
        setTitle('');
        setContent('');
        setIsEditing(true);
        setLoading(false);
        return;
      }

      if (!noteId) {
        setError('Note ID not provided');
        setLoading(false);
        return;
      }

      // Fetch note from Supabase
      const { data, error } = await fetchNoteById(noteId);
      
      if (error) {
        setError('Failed to load note');
        console.error('Error loading note:', error);
      } else if (data) {
        setCurrentNote(data);
        setTitle(data.title);
        setContent(data.content);
        setIsEditing(false);
      } else {
        setError('Note not found');
      }
      setLoading(false);
    };

    loadNote();
  }, [noteId, isCreating]);

  const handleEditToggle = () => {
    if (isEditing && !isCreating && currentNote) {
      // If switching from Edit to Read for an existing note, reset changes
      setTitle(currentNote.title);
      setContent(currentNote.content);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    console.log('Saving note:', { title, content, isCreating }); // Debug log

    try {
      if (isCreating) {
        const { data, error } = await createNote(title, content);
        console.log('Create result:', { data, error }); // Debug log

        if (error) {
          setError(`Failed to create note: ${error.message || error}`);
          console.error('Create error:', error);
        } else if (data) {
          console.log('Note created successfully:', data);
          navigate(`/user/note/${data.id}`);
        } else {
          setError('No data returned from create operation');
        }
      } else {
        // Update existing note
        const { data, error } = await updateNote(noteId, title, content);
        console.log('Update result:', { data, error }); // Debug log

        if (error) {
          setError(`Failed to save note: ${error.message || error}`);
          console.error('Update error:', error);
        } else if (data) {
          setCurrentNote(data);
          setIsEditing(false);
          console.log('Note updated successfully:', data);
        } else {
          setError('No data returned from update operation');
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError(`An unexpected error occurred: ${err.message}`);
    }
    setSaving(false);
  };

  const handleBack = () => {
    navigate('/user'); // Go back to the notes list
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-150px)] text-white text-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Error state (for existing notes)
  if (error && !isCreating) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-150px)] text-white text-2xl">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-start min-h-[calc(100vh-80px)]">
      <div className="bg-green-900/20 rounded-xl shadow-2xl w-full max-w-[calc(100%-4rem)]
                      lg:max-w-4xl flex flex-col overflow-hidden border border-green-700/30 min-h-[70vh] max-h-[85vh]">
        
        {/* Back Button - Top Left */}
        <div className="p-5 pb-0">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-800/30 text-green-300 
                       hover:bg-green-700/40 hover:text-green-200 transition-colors text-sm border border-green-700/50"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Notes</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-5 mt-3 bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Header: Title and Action Buttons */}
        <div className="p-5 border-b border-green-700/30 flex-shrink-0 flex justify-between items-center">
          {/* Title Input / Display */}
          <div className="flex-grow mr-4">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-2xl md:text-3xl font-semibold text-white focus:outline-none focus:border-b-2 focus:border-green-700 pb-1"
                placeholder="Note Title"
              />
            ) : (
              <h2 className="text-2xl md:text-3xl font-semibold text-white break-words">
                {currentNote?.title || 'Untitled'}
              </h2>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (isCreating ? "Create" : "Save")}
                </button>
                <button
                  onClick={isCreating ? handleBack : handleEditToggle}
                  disabled={saving}
                  className="px-5 py-2 rounded-md bg-gray-600 text-white font-semibold hover:bg-gray-700 transition-colors text-sm disabled:opacity-50"
                >
                  {isCreating ? "Cancel" : "Read"}
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="px-5 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-sm"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Body: Content Area */}
        <div className="p-5 flex-grow overflow-y-auto">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[300px] bg-transparent text-gray-200 text-base leading-relaxed focus:outline-none resize-none"
              placeholder="Start typing your note..."
            />
          ) : (
            <p className="text-gray-200 text-base leading-relaxed whitespace-pre-wrap break-words">
              {currentNote?.content || 'No content yet.'}
            </p>
          )}
        </div>

        {/* Footer: Last Edit Date */}
        {!isEditing && currentNote?.updated_at && (
          <div className="p-3 border-t border-green-700/30 text-right text-xs text-gray-400 flex-shrink-0">
            Last Edited: {new Date(currentNote.updated_at).toLocaleDateString('en-GB')}
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteEditor;
