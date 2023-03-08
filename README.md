# E-Commerce-Back-End

## Table of Contents
- [Description](#description)
- [Installation](#Installation)
- [Usage](#usage)
- [Credits](#credits)
- [Code Example](#Code-Example)

## Description
Simple RESTful API demonstration of mongoose ODM / MongoDB hosted on Atlas with Node/Express server running on Heroku.

## Installation
- API, no installation required, though feel free to set up your own implementation locally:
- Clone repository and install dependencies.
- Set up the following environment variable: CONNECTION_STRING = 'mongodb://127.0.0.1:27017/social-media-db'
- If you do not wish to set up the environment variable, then simple go into the config/connection.js and modify the process.env.CONNECTION_STRING variable and change it to the following value: 'mongodb://127.0.0.1:27017/social-media-db'
- Ensure MongoDB is installed and running on your machine.
- You can choose to set up the DB yourself or you can run seed to seed the database with dummy data: "npm run seed"

## Usage
##### Utilize the following link with the paths below: https://warm-temple-65548.herokuapp.com

- path - request type: response: output

##### Users
- /api/users - GET: 200 OK: JSON of all users stored in DB
- /api/users/:id - GET: 200 OK: JSON of a single user given it's ID
- /api/users/:id - DELETE: 200 OK: "User and associated thoughts deleted successfully" upon successful deletion
- /api/users - CREATE: 200 OK: responds with data given if successful (look at example request body below)
req.body should look like this...
```json
    {
        "username": "lernantino",
        "email": "lernatino@gmail.com"
    }
```

- /api/users/:id - PUT: : responds with data given if successful (look at example request body below)
req.body should look like this...
```json
    {
        "username": "amiko2020",
        "email": "updatedemail@email.com"
    }
```

##### Thoughts
- /api/thoughts - GET: 200 OK: JSON of all thoughts stored in DB
- /api/thoughts/:id - GET: 200 OK: JSON of a single thought given it's ID
- /api/thoughts/:id - DELETE: 200 OK: Returns JSON of deleted thought (no longer in DB)
- /api/thoughts - CREATE: 200 OK: responds with data given if successful (look at example request body below)
req.body should look like this...
```json
    {
        "thoughtText": "Here's a cool thought... John Madden",
        "username": "johndoe",
        "userId": "63f9533456c02d866d4479d5"
    }
```

- /api/thoughts/:id - PUT: 200 OK: Responds with JSON of updated thought (look at example request body below)
req.body should look like this...
```json
    {
        "thoughtText": "Updated thought text..."
    }
```

##### Friends
- /api/users/:id/friends/:target_id - POST: 200 OK: Adds target_id to id's friends array in the DB and returns "Friend added"
- /api/users/:id/friends/:target_id  - DELETE: 200 OK: Removes target_id from id's friends array in the DB and returns "Friend removed"

##### Reactions
- /api/thoughts/:thought_id/reactions/:reaction_id - DELETE: 200 OK: Deletes reaction_id from reaction array of of thought associated with thought_id and returns a JSON of the thought data after deletion is performed
- /api/thoughts/:thought_id/reactions - CREATE: 200 OK: responds with JSON of thought data associated with thought_id if successful (look at example request body below)
req.body should look like this...
```json
    {
    "username": "lernantino",
        "reactionBody": "Blah"
    }
```

## Credits
Developed by:

Vess Stewart-
[GitHub](https://github.com/angel-pup)

## Features

- RESTful API
- GET (single/multiple), DELETE, CREATE, UPDATE any of Thoughts, Users, Friends, or Reactions to Thoughts from a hosted Database.

[GitHub repository](https://github.com/angel-pup/social-network-api)

### Code-Example

[![Employee Tracker](https://img.youtube.com/vi/7MUUuP29ysM/0.jpg)](https://www.youtube.com/watch?v=7MUUuP29ysM)