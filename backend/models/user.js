const mongoose = require('mongoose');
const emailValidator = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

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

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new Unauthorized("Incorrect email or password")
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
