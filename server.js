'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const logger = require('./services/logger');
const note = require('./routes/note');
const category = require('./routes/category');

const app = express();
const port = process.env.PORT || 3000;

// Setting the view engine to use jade (jade must be installed with npm install jade --save).
app.set('view engine', 'jade');

// app.use is getting middleware for us here.
// body-parser and method-override are both third party, while logger is written by us.

// body-parser (bodyParser) is middleware that is being used here to parse over urlencoded bodies.
// It returns a parsed object (req.body), and extended is set to false to set parsing to the querystring library.
app.use(bodyParser.urlencoded({
  extended: false
}));

// method-overide is used to allow us to use PUT and DELETE, and other http verbs where the client doesn't
// support it.
app.use(methodOverride('_method'));

// logger is middleware we wrote to handle logging information about our saved objects.
app.use(logger);

// Gets the default route, and sends a string.
app.get('/', (req, res) => {
  res.send('Server Running');
});

// routes
app.use(note);
app.use(category);

// Requires you to connect to use MongoDB in order for the server to start.
// mongoose.connect is connecting to our MongoDB database.
mongoose.connect('mongodb://localhost:27017/evernode', (err) => {
  if (err) throw err;
  // Starts the server and console logs what port it's running on.
  app.listen(port, () => {
    console.log(`Evernode server running on port: ${port}`);
  });
});

