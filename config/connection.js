const mongoose = require('mongoose');
const { connection } = require('mongoose');
require('dotenv').config();

// Enable strict query mode
mongoose.set('strictQuery', true);

// Connect to MongoDB database using Mongoose
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;