const router = require("express").Router();
const Users = require("../models/usersModel.js");


router.get('/users', (req, res) => {
   Users.getUsers()
   .then(users =>{
       res.json(users)
   }) 
   .catch(err => res.send(err))
})

module.exports = router;