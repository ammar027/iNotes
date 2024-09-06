import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSave, faList } from '@fortawesome/free-solid-svg-icons';

const Note = ({ selectedNoteIndex, notes, setNotes, setSelectedNoteIndex, toggleSidebar }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [noteTag, setNoteTag] = useState("");

  useEffect(() => {
    if (selectedNoteIndex !== null) {
      const note = notes[selectedNoteIndex];
      setNoteTitle(note.title || "");
      setNoteInput(note.text || "");
      setNoteDescription(note.description || "");
      setNoteTag(note.tag || "");
    } else {
      setNoteTitle('');
      setNoteInput('');
      setNoteDescription('');
      setNoteTag('');
    }
  }, [selectedNoteIndex, notes]);

  const handleAddNote = () => {
    if (noteTitle.trim() && noteInput.trim()) {
      const newNote = {
        title: noteTitle,
        text: noteInput,
        description: noteDescription,
        tag: noteTag,
        date: new Date().toLocaleString()
      };
      setNotes([...notes, newNote]);
      setSelectedNoteIndex(notes.length); // Select the new note
    }
  };

  const handleSaveNote = () => {
    if (selectedNoteIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === selectedNoteIndex
          ? {
              ...note,
              title: noteTitle,
              text: noteInput,
              description: noteDescription,
              tag: noteTag
            }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNoteIndex(null);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNoteIndex !== null) {
      setNotes(notes.filter((_, index) => index !== selectedNoteIndex));
      setSelectedNoteIndex(null);
    }
  };

  return (
    <div className="note-container">
      <div className="note-navbar">
        
        <button onClick={handleAddNote} className="navbar-btn">
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button onClick={handleSaveNote} className="navbar-btn">
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button onClick={handleDeleteNote} className="navbar-btn">
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button onClick={toggleSidebar} className="navbar-btn">
          <FontAwesomeIcon icon={faList} />
        </button>
      </div>
      <input
        className="note-title-input"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Title..."
      />
      <textarea
        className="note-input"
        value={noteDescription}
        onChange={(e) => setNoteDescription(e.target.value)}
        placeholder="Type your note here..."
      />
    </div>
  );
};

export default Note;
