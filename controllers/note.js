'use strict';

const Note = require('../models/note');
const Category = require('../models/category');
// Exports these functions that are listening for route changes.
// When the route changes, the corresponding function will execute.
module.exports = {
  // Finds all notes in the Notes collection, and loads the notes-index.jade view, along with an object of local
  // variables for the view.
  index (req, res) {
    Note.find({}, (err, notes) => {
      if (err) throw err;

      res.render('notes-index', {notes: notes});
    });
  },

  new (req, res) {
    Category.find({}, (err, categories) => {
      if (err) throw err;

      res.render('new-note', {
        categories: categories
      });
    });
  },

  create (req, res) {
    Note.create(req.body, (err, note) => {
      if (err) throw err;

      res.redirect(`/notes/${note._id}`);
    });
  },

  show (req, res) {
    res.render('show-note', {note: req.note});
  },

  edit (req, res) {
    Category.find({}, (err, categories) => {
      if (err) throw err;

      res.render('new-note', {
        note: req.note,
        categories: categories
      });
    });
  },

  update (req, res) {
    req.note.update(req.body, (err) => {
      if (err) throw err;

      res.redirect(`/notes/${req.note._id}`);
    });
  },

  destroy (req, res) {
    req.note.remove((err) => {
      if (err) throw err;

      res.redirect('/notes');
    });
  }
};