const mongoose = require('mongoose');
const emailValidator = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => emailValidator(v),
      message: "Correo no valido",
    }
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
  },
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
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
