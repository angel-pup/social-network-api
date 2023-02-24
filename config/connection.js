const { connect, connection } = require('mongoose');
require('dotenv').config();

// Connect to MongoDB database using Mongoose
mongoose.connect('mongodb://localhost/social-media-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;