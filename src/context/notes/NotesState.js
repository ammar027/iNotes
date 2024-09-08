import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  // Hardcoded token for now
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkYWUyZmQ3N2RlNzk2MTFmMTY1ZTE5In0sImlhdCI6MTcyNTYyMDk4OX0.xJ4Jb97T9KbCsXqRa_0coTCW_B8_Pl0VMsbMeZH3tGA';

  // Fetch notes from the API
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes/fetchallnotes', {
        headers: {
          'auth-token': token, // Use hardcoded token for now
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes when component mounts
  }, []);

  // Add note
  const addNote = async (title, description, tag) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/notes/addnote',
        { title, description, tag },
        {
          headers: {
            'auth-token': token, // Use hardcoded token
          },
        }
      );
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/deletenote/${id}`, {
        headers: {
          'auth-token': token, // Use hardcoded token
        },
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/notes/updatenote/${id}`,
        { title, description, tag },
        {
          headers: {
            'auth-token': token, // Use hardcoded token
          },
        }
      );
      setNotes(
        notes.map(note =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
