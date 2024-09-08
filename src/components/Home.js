import React, { useState, useContext } from 'react';
import '../css/Home.css';
import Note from './Notes'; // Import Note component
import Alert from './Alert'; // Import Alert component
import NoteContext from '../context/notes/noteContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const { notes, deleteNote } = useContext(NoteContext); // Get notes and deleteNote from context
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [alert, setAlert] = useState(null); // State to control the alert

  // Show alert with a message and type (success or error)
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Auto dismiss after 3 seconds
  };

  // Define filteredNotes by filtering notes based on searchQuery
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNoteClick = (index) => {
    setSelectedNoteIndex(index);
  };

  const handleDeleteNote = (id) => {
    deleteNote(id); // Use deleteNote from context
    showAlert('Note deleted successfully', 'error'); // Trigger delete alert
    if (selectedNoteIndex !== null && notes[selectedNoteIndex]._id === id) {
      setSelectedNoteIndex(null);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="home-container">
      {/* Display Alert */}
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <h3 className="list-title">Your Notes</h3>
        <div className="search-container">
          <FontAwesomeIcon className="search-icon" icon={faSearch} />
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
                key={note._id}
                className={`note-item ${selectedNoteIndex === index ? 'selected-note' : ''}`}
                onClick={() => handleNoteClick(index)}
              >
                <div className="note-header">
                  <span className="note-title">
                    {note.title.length > 20 ? `${note.title.slice(0, 17)}...` : note.title || 'Untitled'}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note._id); // Use the note's ID for deletion
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <span className="note-tag">{note.tag}</span>{/* Display tag */}
                <span className="note-date">{note.date}</span> {/* Display date */}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`notes-section ${sidebarVisible ? '' : 'expanded'}`}>
        <Note
          selectedNoteIndex={selectedNoteIndex}
          setSelectedNoteIndex={setSelectedNoteIndex}
          showAlert={showAlert} // Pass showAlert to Note
          toggleSidebar={toggleSidebar} // Pass toggleSidebar to Note
        />
      </div>
    </div>
  );
};

export default Home;
