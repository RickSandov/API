const { Schema, model } = require('mongoose');

const DocSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, trim: true },
  date_added: { type: Number, default: Date.now() },
  last_modified: { type: Number, default: Date.now() },
});

module.exports = model('Doc', DocSchema);
