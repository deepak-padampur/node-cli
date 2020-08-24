#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer')
// const { findUser, updateUser, removeUser, listUser } = require('./index');
const { addUser, listUser, removeUser, findUser } = require('./firebase-functionality/functions/index.js')


//Prompt question for user
const questions = [{
  type: 'input',
  name: 'firstname',
  message: 'User First Name'
},
{
  type: 'input',
  name: 'lastname',
  message: 'User Last Name'
},
{
  type: 'input',
  name: 'phone',
  message: 'User Phone Number'
}, {
  type: 'input',
  name: 'email',
  message: 'User Email Address'
}]
//setting the version": "

program.version('1.0.0').description('DBMS CLI')

//add commands
// program
//   .command('add <firstname> <lastname> <phone> <email>')
//   .alias('a')
//   .description('Add a new user')
//   .action((firstname, lastname, phone, email) => {
//     addUser({ firstname, lastname, phone, email })
//   })

program
  .command('add')
  .alias('a')
  .description('Add a new user')
  .action(() => {
    prompt(questions).then(answers => addUser(answers))

  })

program
  .command('find <name>')
  .alias('f')
  .description('Find a user')
  .action((name) => {
    findUser(name)
  })
//Update user
program
  .command('update <id>')
  .alias('u')
  .description('Update a user')
  .action((id) => {
    prompt(questions).then(answers => updateUser(id, answers))

  })

//Remove user
program
  .command('remove <id>')
  .alias('r')
  .description('Remove a user')
  .action((id) => {
    removeUser(id)
  })

// //List user
program
  .command('List')
  .alias('l')
  .description('list all users')
  .action(() => {
    listUser()
  })






program.parse(process.argv);