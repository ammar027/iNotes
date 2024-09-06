import React, { useState, useContext } from 'react';
import '../css/Home.css';
import Note from './Notes'; 
import NoteContext from '../context/notes/noteContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const { notes, setNotes } = useContext(NoteContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  // Filter notes based on the search query
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNoteClick = (index) => {
    setSelectedNoteIndex(index);
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
    if (selectedNoteIndex === index) {
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

        {/* Search Input with Search Icon */}
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
                <div className="note-header">
                  <span className="note-title">{note.title || 'Untitled'}</span>
                  <button 
                    className="delete-btn" 
                    onClick={(e) => { e.stopPropagation(); handleDeleteNote(index); }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <span className="note-tag">{note.tag}</span>
                <span className="note-date">{note.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`notes-section ${sidebarVisible ? '' : 'expanded'}`}>
        <Note
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          setNotes={setNotes}
          setSelectedNoteIndex={setSelectedNoteIndex}
          toggleSidebar={toggleSidebar}
        />
      </div>
    </div>
  );
};

export default Home;
