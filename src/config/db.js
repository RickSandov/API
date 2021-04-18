const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost/api_project';

mongoose.connect(DB_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log('Error while connecting to the database\n' + err);

  console.log('Connected to DB');
});

module.exports.default = mongoose;

