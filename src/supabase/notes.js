// src/supabase/notes.js
import { supabase } from './supabase';

// Fetch all notes for the current user
export const fetchUserNotes = async () => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('is_archived', false)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching notes:', error);
    return { data: null, error };
  }

  return { data, error: null };
};

// Fetch a single note by ID
export const fetchNoteById = async (noteId) => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', noteId)
    .single();

  if (error) {
    console.error('Error fetching note:', error);
    return { data: null, error };
  }

  return { data, error: null };
};

// Create a new note
export const createNote = async (title, content) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { data: null, error: 'User not authenticated' };
  }

  const { data, error } = await supabase
    .from('notes')
    .insert([
      {
        user_id: user.id,
        title: title || 'Untitled',
        content: content || '',
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating note:', error);
    return { data: null, error };
  }

  return { data, error: null };
};

// Update an existing note
export const updateNote = async (noteId, title, content) => {
  const { data, error } = await supabase
    .from('notes')
    .update({
      title,
      content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', noteId)
    .select()
    .single();

  if (error) {
    console.error('Error updating note:', error);
    return { data: null, error };
  }

  return { data, error: null };
};

// Delete a note
export const deleteNote = async (noteId) => {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId);

  if (error) {
    console.error('Error deleting note:', error);
    return { error };
  }

  return { error: null };
};
