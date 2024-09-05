import React, { useState } from 'react';
import '../css/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSave, faList } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Filter notes based on the search query
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNote = () => {
    if (noteTitle.trim() && noteInput.trim()) {
      const newNote = { title: noteTitle, text: noteInput };
      setNotes([...notes, newNote]);
      setNoteTitle("");
      setNoteInput("");
      setSelectedNoteIndex(null); // Clear selection after adding
    }
  };

  const handleDeleteNote = (indexToRemove) => {
    setNotes(notes.filter((_, index) => index !== indexToRemove));
    if (selectedNoteIndex === indexToRemove) {
      setNoteTitle("");
      setNoteInput("");
      setSelectedNoteIndex(null);
    }
  };

  const handleNoteClick = (index) => {
    setNoteTitle(notes[index].title);
    setNoteInput(notes[index].text);
    setSelectedNoteIndex(index);
  };

  const handleSaveNote = () => {
    if (selectedNoteIndex !== null) {
      const updatedNotes = notes.map((note, index) => 
        index === selectedNoteIndex 
          ? { title: noteTitle, text: noteInput } 
          : note
      );
      setNotes(updatedNotes);
      setNoteTitle("");
      setNoteInput("");
      setSelectedNoteIndex(null);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="home-container">
      <div className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <h3 className="list-title">Your Notes</h3>
        <input
          className="search-input"
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredNotes.length === 0 ? (
          <p className="no-notes-message">No notes found</p>
        ) : (
          <ul className="notes-list">
            {filteredNotes.map((note, index) => (
              <li
                key={index}
                className={`note-item ${
                  selectedNoteIndex === index ? 'selected-note' : ''
                }`}
                onClick={() => handleNoteClick(index)}
              >
                <span className="note-title">{note.title || 'Untitled'}</span>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent note click
                    handleDeleteNote(index);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`notes-section ${sidebarVisible ? '' : 'expanded'}`}>
        <div className="note-navbar">

        <button
            onClick={() => {
              setNoteTitle('');
              setNoteInput('');
              setSelectedNoteIndex(null);
            }}
            className="navbar-btn"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>

          <button onClick={handleAddNote} className="navbar-btn">
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button onClick={handleSaveNote} className="navbar-btn">
            <FontAwesomeIcon icon={faSave} />
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
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Type your note here..."
        />
      </div>
    </div>
  );
};

export default Home;
