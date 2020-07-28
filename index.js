/**
 * @author Chhanda charan <2017ugcs028@nitjsr.ac.in>
 * @description Connecting to database
 */
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config();

mongoose.connect(process.env.DB, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(con => {
  console.log('Connected....')
}).catch(err => {
  console.log(err);
})