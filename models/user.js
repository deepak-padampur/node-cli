const mongoose = require('mongoose')


//Set a schema for the user

const userSchema = mongoose.Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  }

})

module.exports = mongoose.model('User', userSchema);
