/**
 * @author Chhanda charan <2017ugcs028@nitjsr.ac.in>
 * @description Connecting to database
 */
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose')


//Map global promise to get rid of warning
mongoose.Promise = global.Promise;
console.log(typeof (process.env.DB))
//import models
const User = require('./models/user');
mongoose.connect(process.env.DB, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(con => {
  console.log('Connected..')
}).catch(err => {
  console.log(err)
})

const db = mongoose.connection;



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

//Update user data
const updateUser = (_id, user) => {
  User.update({ _id }, user).then(user => {
    console.info('User data updated')
    db.close()
  })

}
//Remove user data
const removeUser = (_id) => {
  User.remove({ _id }).then(user => {
    console.info('User data Removed')
    db.close()
  })

}


//Listing users

const listUser = () => {
  User.find().then(users => {
    console.info(users);
    console.info(`${users.length} matches`)
    db.close()
  })
}

//Export all methods
module.exports = {
  addUser,
  findUser,
  updateUser,
  removeUser,
  listUser
}



