const functions = require('firebase-functions');//enable to create the firebase functions
const admin = require('firebase-admin');//enables  functions to control all of your backend Firebase services
const express = require('express');//for creating server instance
const cors = require('cors');
const app = express();
//connecting to cloud firestore database

const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-cli-d4cab.firebaseio.com"
});

const db = admin.firestore();
app.use(cors({ origin: true }));

const addUser = (user) => {
  db.collection('Users').add(user).then(user => console.log("New user added")).catch(err => console.log(err));

}

const listUser = () => {
  let response = [];
  db.collection('Users').get().then(snapshot => {
    let docs = snapshot.docs;
    docs.forEach(doc => {
      response.push(doc.id, doc.data());
    })
    console.info(response)
    return response;
  }).catch(err => console.log(err))
}

const removeUser = (id) => {
  db.collection('Users').doc(id).delete().then(() => console.log('Deleted')).catch(err => console.log(err));

}

const updateUser = (id, updatedUserData) => {
  db.collection('Users').doc(id).update(updatedUserData).then((updatedUserData) => {
    console.log(`updated Data:${updatedUserData}`)
    return updatedUserData
  }).catch(err => console.log(err))

}

const findUser = (name) => {
  let response = [];
  db.collection('Users').get().then(snapshot => {
    let docs = snapshot.docs;
    docs.forEach(doc => {
      response.push(doc.data());
    })
    const result = response.filter(el => {
      return el.firstname === name;
    })
    result.length > 0 ? console.log(result) : console.log('No results. This is case sensitive')
    return result;
  }).catch(err => console.log(err))


}


module.exports = {
  addUser,
  listUser,
  removeUser,
  updateUser,
  findUser
}
