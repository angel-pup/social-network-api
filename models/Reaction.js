const mongoose = require('mongoose');
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
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
    }
});

module.exports = reactionSchema;
