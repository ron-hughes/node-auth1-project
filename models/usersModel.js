const db = require('../data/dbConfig.js')

module.exports = {
    getUsers,
    getUserById,
    getBy,
    addUser,

}

// GETS ALL USERS IN DB
function getUsers() {
    return db('users')
}

// GET SPECIFIC USER BY ID
function getUserById(id) {
    return db("users").where({ id })
 }

// GET USER BY USERNAME 

function getBy(filter) {
    return db("users").where(filter);
  }

// REGISTER NEW USER
async function addUser(user) {
     const [id] = await db("users").insert(user, "id")


     return getUserById(id);
 }