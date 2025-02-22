const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
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
});

module.exports = mongoose.model('user', userSchema);
