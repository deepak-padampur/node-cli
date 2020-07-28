const program = require('commander');

const { addUser, findUser } = require('./index');


//setting the version": "

program.version('1.0.0').description('DBMS CLI')


program.parse(process.argv);