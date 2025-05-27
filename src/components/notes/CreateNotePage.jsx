// src/components/notes/CreateNotePage.jsx
import { NoteEditor } from './NoteEditor'; // Import the refactored NoteEditor

function CreateNotePage() {
  return <NoteEditor isCreating={true} />;
}

export default CreateNotePage;
