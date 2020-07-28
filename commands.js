const program = require('commander');

const { addUser, findUser } = require('./index');


//setting the version": "

program.version('1.0.0').description('DBMS CLI')

//add commands
program
  .command('add <firstname> <lastname> <phone> <email>')
  .alias('a')
  .description('Add a new user')
  .action((firstname, lastname, phone, email) => {
    addUser({ firstname, lastname, phone, email })
  })

program
  .command('find <name>')
  .alias('f')
  .description('Find a user')
  .action((name) => {
    findUser(name)
  })




program.parse(process.argv);