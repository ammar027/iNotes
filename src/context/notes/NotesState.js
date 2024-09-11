import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NoteContext from './noteContext';
import LoadingBar from 'react-top-loading-bar';

const NoteState = (props) => {
  const { isLoggedIn, handleLogout } = props; // eslint-disable-line no-unused-vars
  const [notes, setNotes] = useState([]);
  const loadingBarRef = useRef(null); // Ref for the LoadingBar

  // Base URL for API
  const API_URL = 'https://inotebook-vusl.onrender.com/api';

  // Fetch notes from the API
  const fetchNotes = async () => {
    const token = localStorage.getItem('token'); // Dynamically fetch token from localStorage

    if (!token) {
      console.error('No token found! User needs to log in.');
      return;
    }

    try {
      loadingBarRef.current.continuousStart(); // Start loading bar
      const response = await axios.get(`${API_URL}/notes/fetchallnotes`, {
        headers: {
          'auth-token': token, // Use dynamic token
        },
      });
      setNotes(response.data); // Use data directly
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      loadingBarRef.current.complete(); // Stop loading bar
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotes(); // Fetch notes when component mounts or login state changes
    } else {
      setNotes([]); // Clear notes when user logs out
    }
  }, [isLoggedIn]); // Re-fetch notes whenever isLoggedIn changes

  // Add note
  const addNote = async (title, description, tag) => {
    const token = localStorage.getItem('token'); // Dynamically fetch token from localStorage

    if (!token) {
      console.error('No token found! User needs to log in.');
      return;
    }

    try {
      loadingBarRef.current.continuousStart(); // Start loading bar
      const response = await axios.post(
        `${API_URL}/notes/addnote`,
        { title, description, tag },
        {
          headers: {
            'auth-token': token, // Use dynamic token
          },
        }
      );
      setNotes([...notes, response.data]); // Use data directly
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      loadingBarRef.current.complete(); // Stop loading bar
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    const token = localStorage.getItem('token'); // Dynamically fetch token from localStorage

    if (!token) {
      console.error('No token found! User needs to log in.');
      return;
    }

    try {
      loadingBarRef.current.continuousStart(); // Start loading bar
      await axios.delete(`${API_URL}/notes/deletenote/${id}`, {
        headers: {
          'auth-token': token, // Use dynamic token
        },
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      loadingBarRef.current.complete(); // Stop loading bar
    }
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    const token = localStorage.getItem('token'); // Dynamically fetch token from localStorage

    if (!token) {
      console.error('No token found! User needs to log in.');
      return;
    }

    try {
      loadingBarRef.current.continuousStart(); // Start loading bar
      const response = await axios.put(
        `${API_URL}/notes/updatenote/${id}`,
        { title, description, tag },
        {
          headers: {
            'auth-token': token, // Use dynamic token
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
    } finally {
      loadingBarRef.current.complete(); // Stop loading bar
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Clear token
    setNotes([]); // Clear notes
    // Optionally, handle additional logout logic here
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, logout }}>
      <LoadingBar color="#ffd52e" ref={loadingBarRef} /> {/* Include LoadingBar */}
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
