// Import necessary packages
const express = require('express');
const routes = require('./routes')
const connection = require('./config/connection');

// Set up express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes...
app.use(routes);

connection.once("open", () => {
    app.listen(PORT, () => {
        console.log('Server running!');
    });
});