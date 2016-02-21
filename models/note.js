'use strict';

const mongoose = require('mongoose');
// Here mongoose.model is being used to save a new document.
// For mongoose.model, the first parameter is telling which collection to save the document in.
// Inside of the mongoose.Schema, we're telling mongoose how the document should be saved.
module.exports = mongoose.model('Notes',
  mongoose.Schema({
    title: String,
    text: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories'
    }
  })
);