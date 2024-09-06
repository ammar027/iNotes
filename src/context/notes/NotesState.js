import React, { useState } from 'react';
import NoteContext from './noteContext'; // Make sure this path is correct

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "66dae33677de79611f165e1d",
      "user": "66dae2fd77de79611f165e19",
      "title": "Heelo James",
      "description": "Too late be quick",
      "tag": "personal",
      "date": "2024-09-06T11:10:46.077Z",
      "__v": 0
    },
    {
      "_id": "66dae85701dfbacae57d900d",
      "user": "66dae2fd77de79611f165e19",
      "title": "Heelo World",
      "description": "dmdmdmn late be quick",
      "tag": "personal",
      "date": "2024-09-06T11:32:39.230Z",
      "__v": 0
    },
    {
      "_id": "66dae86d01dfbacae57d900f",
      "user": "66dae2fd77de79611f165e19",
      "title": "Heelo World",
      "description": "dmdmdmn late be quick",
      "tag": "personal",
      "date": "2024-09-06T11:33:01.912Z",
      "__v": 0
    }
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;