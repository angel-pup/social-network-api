const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 24
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 
        'Please enter a valid email address.'
    ]
  },
//   password: { // Currently unused
//     type: String,
//     required: true,
//     minlength: 6,
//   },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
},
{ timestamps: true });


// Currently unused
// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (!user.isModified('password')) {
//       return next();
//     }
//     try {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       user.password = hashedPassword;
//       return next();
//     } catch (err) {
//       return next(err);
//     }
// });
  
// Currently unused
// userSchema.methods.comparePassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// };

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;