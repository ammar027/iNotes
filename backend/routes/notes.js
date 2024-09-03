const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: GET all the notes using: GET "/fetchallnotes". Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add a new note using: POST "/api/notes/addnote". Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login Required
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "Title is required").optional().notEmpty(),
    body("description", "Description is required").optional().notEmpty(),
    body("tag", "Tag is required").optional().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    try {
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );

      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if the user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    // Delete the note
    await Notes.findByIdAndDelete(req.params.id);

    res.json({ success: "Note has been deleted", note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
