const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
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

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
