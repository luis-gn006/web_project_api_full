const mongoose = require('mongoose');
const user = require('./user');

const cardsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const url = /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+(\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*#?)?$/gm;
        return url.test(v);
      },
      message: 'Lo siento. Tu link no es valido',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardsSchema);
