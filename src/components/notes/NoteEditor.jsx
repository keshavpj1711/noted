// src/components/notes/NoteEditor.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNoteById, updateNote, createNote, deleteNote, togglePinNote } from '../../supabase/notes';
import { useAuth } from '../../contexts/AuthContext';

function NoteEditor({ noteId: propNoteId, isCreating = false }) {
  const params = useParams();
  const noteId = isCreating ? null : (propNoteId || params.noteId);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentNote, setCurrentNote] = useState(null);
  const [isEditing, setIsEditing] = useState(isCreating);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pinning, setPinning] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNote = async () => {
      if (isCreating) {
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
      setTitle(currentNote.title);
      setContent(currentNote.content);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      if (isCreating) {
        const { data, error } = await createNote(title, content);

        if (error) {
          setError(`Failed to create note: ${error.message || error}`);
        } else if (data) {
          navigate(`/user/note/${data.id}`);
        } else {
          setError('No data returned from create operation');
        }
      } else {
        const { data, error } = await updateNote(noteId, title, content);

        if (error) {
          setError(`Failed to save note: ${error.message || error}`);
        } else if (data) {
          setCurrentNote(data);
          setIsEditing(false);
        } else {
          setError('No data returned from update operation');
        }
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      const { error } = await deleteNote(noteId);
      
      if (error) {
        setError(`Failed to delete note: ${error.message || error}`);
      } else {
        navigate('/user'); // Redirect to notes list after successful deletion
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
    }
    setDeleting(false);
  };

  const handleTogglePin = async () => {
    setPinning(true);
    setError('');

    try {
      const { data, error } = await togglePinNote(noteId, currentNote.is_pinned);
      
      if (error) {
        setError(`Failed to ${currentNote.is_pinned ? 'unpin' : 'pin'} note: ${error.message || error}`);
      } else if (data) {
        setCurrentNote(data);
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
    }
    setPinning(false);
  };

  const handleBack = () => {
    navigate('/user');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-150px)] text-white text-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

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
        
        {/* Top Action Bar: Back, Delete, Pin buttons */}
        <div className="p-5 pb-0">
          <div className="flex items-center justify-between">
            {/* Left side: Back button */}
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

            {/* Right side: Delete and Pin buttons (only for existing notes) */}
            {!isCreating && currentNote && (
              <div className="flex items-center space-x-3">
                {/* Pin/Unpin Button */}
                <button
                  onClick={handleTogglePin}
                  disabled={pinning}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm border transition-colors ${
                    currentNote.is_pinned
                      ? 'bg-yellow-600/30 text-yellow-300 border-yellow-600/50 hover:bg-yellow-500/40'
                      : 'bg-gray-700/30 text-gray-300 border-gray-600/50 hover:bg-gray-600/40'
                  } disabled:opacity-50`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill={currentNote.is_pinned ? "currentColor" : "none"}
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>{pinning ? 'Processing...' : (currentNote.is_pinned ? 'Unpin' : 'Pin')}</span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-red-700/30 text-red-300 
                           hover:bg-red-600/40 hover:text-red-200 transition-colors text-sm border border-red-600/50 disabled:opacity-50"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>{deleting ? 'Deleting...' : 'Delete'}</span>
                </button>
              </div>
            )}
          </div>
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
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-white break-words">
                  {currentNote?.title || 'Untitled'}
                </h2>
                {/* Pin indicator in title */}
                {currentNote?.is_pinned && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-yellow-400" 
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                )}
              </div>
            )}
          </div>

          {/* Save/Edit Buttons */}
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
