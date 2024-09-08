import React, { useState } from 'react';
import NoteContext from './noteContext'; 

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "66dae33677de79611f165e1d",
      "user": "66dae2fd77de79611f165e19",
      "title": "Hello James",
      "description": "Too late be quick",
      "tag": "personal",
      "date": "2024-09-06T11:10:46.077Z",
      "__v": 0
    },
    {
      "_id": "66dae33677de79611fnnn165e1d",
      "user": "66dae2fd77de79611f165e19",
      "title": "Hello James",
      "description": "Too late be quick",
      "tag": "personal",
      "date": "2024-09-06T11:10:46.077Z",
      "__v": 0
    }
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add note
  const addNote = (title, description, tag) => {  
    const newNote = {
      "_id": new Date().getTime().toString(),
      "user": "66dae2fd77de79611f165e19",
      "title": title,
      "description": description,
      "tag": tag,
      "date": new Date().toISOString(),
      "__v": 0
    };
    setNotes([...notes, newNote]);
  };

  // Delete note
  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note._id !== id);
    setNotes(updatedNotes);
  };

  // Edit note
  const editNote = (id, title, description, tag) => {
    const updatedNotes = notes.map(note =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
