import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faSave,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import NoteContext from "../context/notes/noteContext"; // Import NoteContext

const Note = ({
  selectedNoteIndex,
  setSelectedNoteIndex,
  showAlert,
  toggleSidebar,
}) => {
  const { notes, addNote, editNote, deleteNote } = useContext(NoteContext); // Get context values
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [noteTag, setNoteTag] = useState(""); // New state for tag

  // When a note is selected, populate the fields with the selected note's details
  useEffect(() => {
    if (selectedNoteIndex !== null) {
      const selectedNote = notes[selectedNoteIndex];
      setNoteTitle(selectedNote.title || "");
      setNoteDescription(selectedNote.description || "");
      setNoteTag(selectedNote.tag || ""); // Populate tag as well
    } else {
      setNoteTitle("");
      setNoteDescription("");
      setNoteTag(""); // Clear tag when no note is selected
    }
  }, [selectedNoteIndex, notes]);

  const handleAddNote = () => {
    if (noteTitle.trim() && noteDescription.trim()) {
      addNote(noteTitle, noteDescription, noteTag); // Pass tag to addNote
      showAlert("Note added successfully", "success"); // Trigger add alert
      setSelectedNoteIndex(notes.length); // Select the new note
    }
  };

  const handleSaveNote = () => {
    if (selectedNoteIndex !== null) {
      const note = notes[selectedNoteIndex];
      editNote(note._id, noteTitle, noteDescription, noteTag); // Pass tag to editNote
      showAlert("Note updated successfully", "success"); // Trigger update alert
    }
  };

  const handleDeleteNote = () => {
    if (selectedNoteIndex !== null) {
      const note = notes[selectedNoteIndex];
      deleteNote(note._id); // Delete note via context
      showAlert("Note deleted successfully", "error"); // Trigger delete alert
      setSelectedNoteIndex(null); // Clear selection after deleting
    }
  };
  return (
    <>
      <div className="note-navbar">
        <button onClick={handleAddNote} className="navbar-btn">
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button onClick={handleSaveNote} className="navbar-btn">
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button className="navbar-btn" onClick={handleDeleteNote}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        {/* Sidebar Toggle Button */}
        <button className="navbar-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faList} />
        </button>
      </div>
      <input
        className="note-title-input"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Title..." id="title"
      />
      
      <select
        className="note-tag-input"
        value={noteTag}
        onChange={(e) => setNoteTag(e.target.value)}
      >
        <option value="">Select Tag</option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="important">Important</option>
        <option value="misc">Misc</option>
      </select>
      
      <textarea
        className="note-input"
        value={noteDescription}
        onChange={(e) => setNoteDescription(e.target.value)}
        placeholder="Type your note here..." id="description "
      />


    </>
  );
};

export default Note;
