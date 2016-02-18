'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const Note = mongoose.model('notes', mongoose.Schema({
  title: String,
  text: String
}));

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.send('server route');
});

app.get('/notes/new', (req, res) => {
  res.render('new-note');
});

app.get('/notes/:id', (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if (err) throw err;

  res.render('show-note', {note: note});
  });  
});

app.post('/notes', (req, res) => {
  Note.create(req.body, (err, note) => {
    if (err) throw err;
    res.redirect(`/notes/${note._id}`);
  });
  console.log(req.body);
});

mongoose.connect('mongodb://localhost:27017/evernode', (err) => {
  if (err) throw err;

  app.listen(port, () => {
    console.log(`nodenotes server running on port: ${port}`)
  });
});