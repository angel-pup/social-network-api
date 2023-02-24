const mongoose = require('mongoose');
const Reaction = require('./Reaction')

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => {
      // format timestamp to string in "Month day, year" format
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium'
      }).format(timestamp);
    }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [Reaction]
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
