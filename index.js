/**
 * @author Chhanda charan <2017ugcs028@nitjsr.ac.in>
 * @description Connecting to database
 */
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config();

//import models
const User = require('./models/user');

const db = mongoose.connect(process.env.DB, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(con => {
  console.log('Connected....')
}).catch(err => {
  console.log(err);
})


//Add a new user
const addUser = (user) => {

  User.create(user).then(user => {
    console.info('New customer added');
    //Close DB----other wise it will hang
    db.close()

  })

}

//Find user

const findUser = (name) => {
  //Make a case insensitive
  const searchQuery = new RegExp(name, 'i');

  User.find({ $or: [{ firstname: searchQuery }, { lastname: searchQuery }] }).then(user => {
    console.info(user);
    console.info(`${user.length} matches`)
    db.close()
  })

}

//Export all methods
module.exports = {
  addUser,
  findUser
}



