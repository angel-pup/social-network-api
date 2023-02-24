// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const { User, Thought, Reaction } = require('./models');
const routes = require('./routes')

// Set up express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to MongoDB database using Mongoose
mongoose.connect('mongodb://localhost/social-media-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sync Mongoose models to database
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to social-media-db!');
});

app.use(express.json());

// Routes...
app.use(routes);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log('Server running!');
    });
});